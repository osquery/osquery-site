---
title: "Windows registry and osquery: ensuring per-user settings are configured as expected"
author: "Guillaume Ross"
date: "2019-01-25"
---

The Windows registry is full of information, and with the proper tools, can be a gold mine for attackers and defenders alike. 

Attackers look to find specific configurations, credentials, or any information that can help them further attack systems, while defenders can use the registry to ensure that settings are configured as they are expected to. 

This is something that is not always easy to do with standard tools in Windows, especially with the right level of performance. 

Fortunately, osquery solves that for us.

## Reading from the registry

Let’s consider GPOs, which most organizations with a Windows environment and Domain use. GPOs are usually just a way to get a set of specific values configured in the registry.

Osquery allows us to query the registry for those values very easily.

For example, this query returns the settings related to [Microsoft LAPS](https://technet.microsoft.com/en-us/mt227395.aspx).

```sql
SELECT data, path FROM registry

WHERE key = 'HKEY_LOCAL_MACHINE\Software\Policies\Microsoft Services\AdmPwd';
```

![LAPS configuration output](osqueryresultsLAPS)



That was easy, but many settings in the registry are « per user ».

The registry hive « HKEY_CURRENT_USER » (HKCU) represents the path to the current user’s registry settings.

The problem when monitoring systems for security is that every user has its own set of registry settings, located under « HKEY_USERS », so querying for a specific path will not work, as different profiles get created on systems.

![Per-user registry hives](windowsRegistryHivesUsers)


In order to monitor configurations that are done « per user » in Windows, we can leverage the power of wildcards in osquery:

```
SELECT data, path FROM registry
WHERE key LIKE 'HKEY_USERS\%\Control Panel\Accessibility\StickyKeys';
```

![Sticky keys](osqueryresultsStickyKeys)

Unless a user needs sticky keys, that value should actually be set to **506**, to prevent [abuse](http://carnal0wnage.attackresearch.com/2012/04/privilege-escalation-via-sticky-keys.html) to elevate privileges, as it is the value that gets written when sticky keys are disabled completely.

This query returns the sticky keys configuration values found for every user. The results are there, but, as someone trying to understand what user is impacted by what setting, they are not very readable. 

Fortunately, using SQL, we can easily join tables together, and the users table contains the data we are looking for.

To join tables, we need a row with common data.
The [registry](https://osquery.io/schema/3.3.0#registry) table contains: *key, path, name, type, data, mtime*.

The [users](https://osquery.io/schema/3.3.0#users) table contains none of these, but contains *uuid*, which, on Windows, returns the SID(Security Identifier).

If you are not familiar with SIDs, they are unique identifiers for users, groups and logon sessions. [Generic accounts](https://docs.microsoft.com/en-us/windows/desktop/secauthz/well-known-sids) and groups on Windows have the same SID on every installation, but each account created has a random SID. The SID is *exactly what is used to separate users in the registry.* So while the registry table doesn’t have a column with the SID, the path column does contain the SID.

Osquery supports [SQL additions](https://osquery.readthedocs.io/en/stable/introduction/sql/#sql-additions), including **split**. Split allows us to specify that a column be separated, and to create a new column with only that part of the value. 

The registry, like many things in Windows, is separated by backslashes. In this case, we want the first value, returned after a backslash, to be its own column. Therefore, we will use `split(path, '\', 1)`, to obtain the first value located between backslashes in *path*. 

Then, we need to map this to the user table, on the *uuid* field. We’ll call the column we are creating *sid*. 

```sql
SELECT username, data, split(path, '\', 1) AS sid 
FROM 
	(SELECT data, path FROM registry 
	WHERE key LIKE 'HKEY_USERS\%\Control 		
	Panel\Accessibility\StickyKeys') 
JOIN users ON users.uuid = sid;
```

![Sticky keys mapped to users](osqueryresultsUsers)

We now know that g and bob need to have their settings updated. Local Service and Network Service are not interactive accounts.

**Wait**! Those are only usernames. It would be much more useful to know which ones are used interactively, and what their Active Directory User-Principal-Names are, so appropriate GPOs can be deployed.

Luckily for us, the [logon_sesions](https://osquery.io/schema/3.3.0#logon_sessions) table contains the SID and the UPN, as well as a logon type table.

To achieve this, we simply need to add the required columns, and join  on the *logon_sessions.logon_sid column*.

```sql
SELECT user, logon_sid, logon_type, upn, data, split(path, '\', 1) AS sid 
FROM 
	(SELECT data, path FROM registry 
	WHERE key LIKE 'HKEY_USERS\%\Control Panel\Accessibility\StickyKeys') 
JOIN logon_sessions ON logon_sessions.logon_sid = sid;
```

![Sticky keys mapped back to active domain users](osqueryresultsDomainUsers)

We now have a query that returns local and domain accounts, with the UPN for domain accounts, for users that are actually logged in. 

You could refine the results further, to hide any line for *logon_type* that is not equal to *Interactive* and to hide *data* where it is properly configured to **506**, or you could configure scheduled queries to send the entire data to your centralized repository, so you could then crunch it there.

By constantly monitoring this data, you will now be able to know exactly what user population to target with a configuration change.

This is just a simple example of the combined power of osquery and the Windows registry. By joining the *registry* and *users* or *logon_sessions* tables, you should now be able to monitor any user setting. 


*PS: Never disable accessibility features for security reasons without having a clear, managed system to keep them enabled for people that need them!*

*This post originally appeared on the* [Uptycs Blog](https://www.uptycs.com/blog/windows-registry-osquery-the-easy-way-to-ensure-users-are-secured).
