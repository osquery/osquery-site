### The Challenge

OSQuery is a tremendous leap forward in endpoint security.It's effectively made endpoint visibility, a key technology that was previously used as a "barrier to entry" for the endpoint security market, into a commodity that is easily extendable.

However, with that flexibility and extend-ability, comes some challenges related to dealing with large volumes of data. There's many free [OSQuery packs](https://github.com/facebook/osquery/tree/master/packs) included in Github.

These serve as a great reference and starting place. Yet the reality is that if you downloaded and enabled all these packs then you can expect 30MB per host per day. A company that wants to retain 3 months of data for analysis with 1000 devices is looking at around 2.5TB of data to store and process. This is not viable for most given the cost of storage and SIEM tools.

There's obviously lots of ways to solve this problem. Most notably, we do not recommend blindly enabling loads of queries without optimizing them for your use-case. Let's dive into some ways to start optimizing queries.

### Optimizing Queries

OSQuery, being the awesome tool it is, provides lots of ways to deal with this data. The best starting place to a good experience with OSQuery is understanding how to write an optimized query. Let's dive into some concepts to better understand what this means.

### Query Interval

The most obvious is the Query Interval which defines _how often _a query should execute in seconds.

Ultimately, this can be anywhere from 5 seconds to 1 day to 1 month. One solution is to simply run each query less often. However, there's a delicate balance between "missing important data" (malware drops on disk, runs, self-removes while query is pending) and negatively impacting system performance. 

There's a few factors that we suggest weighing when choosing a Query Interval -

1.  What is the impact if data is missed?
    1.  If it's none or low, the interval should be high (less often).
    2.  If it's high, make efficient query and decrease interval (more often).
2.  What is the [performance impact](https://osquery.readthedocs.io/en/stable/deployment/performance-safety/) if the query?
    1.  If it's high, the interval needs to be less aggressive (less often).
    2.  If it's low, the interval can potentially be more aggressive (more often).

We've gotten our most important queries humming with fast interval and minimal system impact but what about all this data?

### Differential Results

The default results logging mode is "differential". This means that OSQuery will produce "result" logs for _changes_ including additions (log_type: "added") and removals (log_type: "removed"). Therefore, a complete state of a machine can be re-created in the back-end by comparing these results.

This mode reduces the data size tremendously when used correctly.  Intervals can be reduced to _seconds_ and results will only be generated when _relevant _changes are found. This is obviously assuming that you can optimize the query enough to make it this aggressive. More on that in another post.

This mode imposes some "best practices" that we follow here at DarkBytes since we use it quite extensively. They may be helpful to those who are trying to deal with large volumes of OSQuery-related data using differential results.

#### 1 - Columns Matter

Give careful consideration to what columns are in the select statement. Consider the question "what set of columns provides the uniqueness required for your use-case?".

For example, if a query is in a pack for a user's workstation, not a server, then one large optimization is to remove "Source Port" ("columns.local_port") so that the results are less unique. This will generate less differential results at the expense of missing potential data. A trade of that may, or may not, make sense depending on the use-case.

```sqlite3
SELECT DISTINCT p.name, p.uid, p.gid, p.cmdline, p.pid, p.parent, p.path,
po.remote_address, po.remote_port, po.local_address, po.local_port FROM
process_open_sockets AS po JOIN processes AS p USING (pid) WHERE remote_port != 0
and p.path <> '' and remote_address <> '';
```

#### 2 - Avoid Ephemeral Columns

Avoid selecting columns that contain ephemeral data (data that is unique and constantly-changing). A few examples of this might include timestamps, source port, generated random identifiers, etc.

```
osquery> SELECT unix_time FROM time;
unix_time = 1520948800
osquery> SELECT unix_time FROM time;
unix_time = 1520948802
```

#### 3 - Avoid Wildcards

Avoid queries that use wildcards to to return all columns in the table. Even if all the columns in a table seem "safe" at the time of writing the query. In a rapidly evolving open-source ecosystem it's best to define exactly what you want so future project improvements don't impose unexpected behavior.

```
osquery> SELECT * FROM processes;
```

#### 4  - Epoch Counter

OSQuery provides a mechanism called an "epoch" that allows you to enhance the differential query logic. Basically, if the epoch in a configuration has changed then the next set of results will be treated as new.

Historical analytics tools such as a SIEM or ELK often have a "time picker" with relative options such as "Last 24 Hours" or "Last 7 Days". The epoch can be used to generate a time-segment specific timestamp to ensure that data always exists for the minimum-defined time-frame in the application.

Consider the following code to generate a "daily" Epoch in Ruby -

```
irb(main):001:0> require 'date'
=> true
irb(main):002:0> Date.today.to_time.to_i
=> 1520924400
```

This then needs to be added into the configuration file under the "options" key -

```
{
  "options": {
    "host_identifier": "uuid",
    "schedule_splay_percent": "20",
    "disable_events": "false",
    "disable_audit": "false",
    "audit_allow_config": "true",
    "schedule_epoch": "1520924400"
  }
}
```

### Snapshot Results

Another result logging mode is "snapshot". This mode provides a complete point-in-time set of results.

This could be useful if there's only a need to collect _occasional __sample data_ but it imposes significantly more processing on the back-end for _continuous monitoring_ use-cases. It's also very important to note that changing this logging mode completely changes the [log result format](https://osquery.readthedocs.io/en/stable/deployment/logging/#snapshot-format).  

> *This post originally appeared on the [DarkBytes Blog](https://www.darkbytes.com/osquery-optimizing-queries/).*
