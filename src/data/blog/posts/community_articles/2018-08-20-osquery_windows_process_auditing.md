## Configure Process Auditing with Osquery on Windows

Facebook's [Osquery](https://osquery.io/) is a proven, lightweight tool to gather process information from endpoints.

Osquery has a concept of "tables", similar to a database, that provide a SQL interface to structured data. It's important to understand the 2 different types of tables, normal and event, which operate very differently.

Let's dive into how this applies in the context of process auditing.

#### Processes Table

The [`processes`](https://osquery.io/schema/3.2.6#processes) table is a normal table that takes a snapshot of the current running processes. This is similar to running "ps" in macOS/Linux or "tasklist" in Windows.

This works alright for use-cases that only need a data sample. However, it does a pretty awful job at providing an audit log of every process creation event. Facebook covers this briefly in their blog post about [How to use RocksDB](https://code.fb.com/security/how-rocksdb-is-used-in-osquery/).

> While periodically querying the `processes` table will satisfy some use-cases, this is a lossy strategy for event-based tables. If you, for example, wanted an audit log of every process creation event, periodically observing the running processes would not produce accurate data.

There are a couple benefits to the `processes` table such as not needing any system configuration changes and being supported on all 3 platforms - Windows, macOS, and Linux.

####  Process_events Table

The [`process_events`](https://osquery.io/schema/3.2.6#process_events) table is an event-based table. Results in an event-based table are cleared after each query that is executed on that table. In addition, new results are added to the table every time a process is created. Therefore, the `process_events` table provides a complete audit log of every process creation without duplicates.

This is implemented via  OpenBSM on macOS and Auditd on Linux. Unfortunately, the `process_events` table is not currently supported on the Windows version of Osquery. This is quite unfortunate since many enterprises rely heavily on Windows systems.

## Enabling Windows Process Auditing

Fortunately, there is a way to solve this problem using the power Osquery already has built-in. Microsoft Windows 7 and up has a concept of ["process auditing"](https://docs.microsoft.com/en-us/windows/security/threat-protection/auditing/audit-process-creation) which is not turned on by default. Once enabled, it will generate event logs for process creation with all the typical data points that one would expect.

The first step is to enable process auditing. This can be done using [Group Policy](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/manage/component-updates/command-line-process-auditing) or locally with the command below.

```
Auditpol /set /category:"Detailed Tracking" /subcategory:"Process Creation" /success:enable
```

You can verify that process auditing is enabled by running the below command.

```
Auditpol /get /category:"Detailed Tracking" /subcategory:"Process Creation"
```

In addition, Windows requires that you set a registry entry to add the entire command line string into the event data structure. This can be done with the command below.

```
reg add HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\System\Audit /v ProcessCreationIncludeCmdLine_Enabled  /t REG_DWORD /d 1
```

That's it! Now Windows will generate an event with [Event ID 4688](https://docs.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4688) each time a process is created. Now we just need to access this data!

## Querying Windows Event Log

Next we're going to leverage the [windows_events table](https://osquery.io/schema/3.2.6#windows_events) to collect and parse the events. This table has been around for some time. However, it can be intimidating given the quantity of event logs and complexity of the data structure.

#### Query

This query will gather the Process Creation events, extract the fields from the JSON data, and format them into columns that are similar to the existing `processes` and `process_events` tables.

```sql
SELECT
	eventid,
	JSON_EXTRACT(data, '$.EventData.CommandLine') AS cmdline,
	JSON_EXTRACT(data, '$.EventData.NewProcessId') AS pid,
	JSON_EXTRACT(data, '$.EventData.ProcessId') AS parent,
	JSON_EXTRACT(data, '$.EventData.ParentProcessName') AS parent_path,
	JSON_EXTRACT(data, '$.EventData.NewProcessName') AS path,
	JSON_EXTRACT(data, '$.EventData.SubjectLogonId') AS uid,
	JSON_EXTRACT(data, '$.EventData.SubjectUserName') AS username,
	JSON_EXTRACT(data, '$.EventData.SubjectDomainName') AS domain,
	REPLACE(JSON_EXTRACT(data, '$.EventData.NewProcessName'), (SELECT REGEX_SPLIT(JSON_EXTRACT(data, '$.EventData.NewProcessName'), "[\.\w-]+$", 0)), '' ) AS name,
	REPLACE(JSON_EXTRACT(data, '$.EventData.ParentProcessName'), (SELECT REGEX_SPLIT(JSON_EXTRACT(data, '$.EventData.ParentProcessName'), "[\.\w-]+$", 0)), '' ) AS parent_name
FROM windows_events
WHERE eventid = 4688;
```

This query looks a little intimidating but it's really not when you break it down.
1. Each line with JSON_EXTRACT is simply pulling out data from the event log data which is stored as a JSON string in the "data" column.
2. The 2 lines using "REPLACE" and "REGEX_SPLIT" are extracting the filename (E.G. - cmd.exe) from the path (E.G. - C:\\WINDOWS\\SYSTEM32\\cmd.exe).

That's it! Lots of syntax and parsing but not much in terms of complex query logic.

#### Result

The result from this query is pretty similar to the `processes` table. It's missing some of the more esoteric columns but it has the important ones.

```
eventid = 4688
cmdline = \??\C:\WINDOWS\system32\conhost.exe 0xffffffff -ForceV1
    pid = 0x664
 parent = 0x438
parent_path = C:\Windows\System32\cmd.exe
   path = C:\Windows\System32\conhost.exe
    uid = 0x3e7
username = User1
 domain = MY-PC
   name = conhost.exe
parent_name = cmd.exe
```


#### Hex IDs

One thing that's a little annoying is that the process IDs and user IDs are expressed as a hex string in the event log. Since it's a string, it cannot be natively interpreted by SQLite in order to CAST it to a decimal.

At [DarkBytes](https://www.darkbytes.com/), we worked around this problem by creating a simple utility table (hex_to_int) in the DarkBytes Osquery extension to convert it. The extension is implemented using [Kolide's osquery-go](https://github.com/kolide/osquery-go) bindings and Golang's strconv library. Please [check out the code](https://gist.github.com/dgriffin831/dc014c76ae33b4a1dbd613dd2ea418ee) for this utility table on Github.

The table ingests the hex string and returns a decimal.

```sql
SELECT int from hex_to_int WHERE hex_string = "0x664"
```

```
int = 1636
```

This means we just modify the above query with some sub-queries to convert the data type.


```sql
SELECT
    (SELECT int from hex_to_int WHERE hex_string = JSON_EXTRACT(data, '$.EventData.NewProcessId')) AS pid,
FROM windows_events
WHERE eventid = 4688;
```

Now we get the decimal representation as expected.
```
pid = 1636
```

## Learn More

Stay tuned for [future posts](https://osquery.io/blog/community-articles) on Osquery! If you have any questions please hop into #process-auditing or #windows in the [Osquery Slack](https://osquery.slack.com/).

Learn more about how [DarkBytes](https://www.darkbytes.com/blog) is leveraging Osquery to streamline security operations!
