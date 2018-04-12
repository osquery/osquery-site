Wecome to part 2!  In [part 1](https://blog.securelyinsecure.com/post/holiday-hack-2015-pt1/) we looked at the first part of the osquery configuration
and the options used to set osquery's behavior.  In this post, we'll finish up looking at the config so we can move
on to more interesting things in subsequent posts!


### Schedule
Next up is the "schedule" section.  Once again we'll clean out the comments, since we can comment in the blog instead.

```commandline
{
  "options": {
  ---<snip>---
  },
  "schedule": {
    "system_info": {
      "query": "SELECT hostname, cpu_brand, physical_memory FROM system_info;",
      "interval": 3600
    }
  },
    ---<snip>---
}
```

Here we have our first look at what gives osquery its name. Inside the schedule sections, we see a query defined, with the name
of "system_info".  What this query does is defined in the value of the "query" key, inside the "system_info" key.

Named queries (eg "system_info") inside the schedule key, are instructions for osquery to run the particular query every
X seconds.

In this case, the "system_info" named query would do the following: 
```commandline
Every 3600 seconds, return the values in the columns hostname, cpu_brand and physical_memory,
 from the TABLE named system_info
```

This result is then logged to the filesystem in `/var/log/osquery/osquery.results`

### Decorators

Decorators are a special set of queries that add additional context or information when queries are run

```commandline
"decorators": {
    "load": [
      "SELECT uuid AS host_uuid FROM system_info;",
      "SELECT user AS username FROM logged_in_users ORDER BY time DESC LIMIT 1;"
    ]
  }
```

When a query is run, such as the scheduled "system_info" query we looked at earlier, 
any decorators which have been defined will also be added to the results of the query.


In this case, in addition to getting values for hostname, cpu_brand and physical_memory 
from our query, we will also get a value for the host_uuid, as well as the username of 
the last user to log into the system.  This type of info
can be extremely useful for providing context around the raw data that queries might return.  
In this case, the usefulness may be somewhat limited, but you can contruct 
decorators to use any query you like, just as you would a normal query.

Note: decorators can be of type `load`, `always` and `interval`.

[from the docs](https://osquery.readthedocs.io/en/stable/deployment/configuration/):

`
The types of decorators are:  load: run these decorators when the configuration loads (or is reloaded) always: run these decorators before each query in the schedule * interval: a special key that defines a map of interval times
`

### Packs
Finally we come to packs.
Packs are a way of creating groups of queries which can be run on schedules.  Rather 
than adding all the queries we want to run into the schedule section of the main config, packs allow us to group
our packs together, schedule them and distribute them as needed.

Here's the pack section from the default config we've been working with. 

Note:  I've uncommented the packs from the config. They ship as commented out with `//` when installed
```json
---<snip>---
  "packs": {
    "osquery-monitoring": "/usr/share/osquery/packs/osquery-monitoring.conf",
    "incident-response": "/usr/share/osquery/packs/incident-response.conf",
    "it-compliance": "/usr/share/osquery/packs/it-compliance.conf",
    "osx-attacks": "/usr/share/osquery/packs/osx-attacks.conf",
    "vuln-management": "/usr/share/osquery/packs/vuln-management.conf",
    "hardware-monitoring": "/usr/share/osquery/packs/hardware-monitoring.conf",
    "ossec-rootkit": "/usr/share/osquery/packs/ossec-rootkit.conf"
  }
}
```

By uncommenting all these packs, I've effectively told osquery to read the files in each packs path and run
the queries described in each.   Below is a quick rundown on what a pack looks like and how it works.


Here's the first few queries in the default `incident-response` pack:
```json
{
  "queries": {
    "launchd": {
      "query" : "select * from launchd;",
      "interval" : "3600",
      "platform" : "darwin",
      "version" : "1.4.5",
      "description" : "Retrieves all the daemons that will run in the start of the target OSX system.",
      "value" : "Identify malware that uses this persistence mechanism to launch at system boot"
    },
    "startup_items": {
      "query" : "select * from startup_items;",
      "interval" : "86400",
      "platform" : "darwin",
      "version" : "1.4.5",
      "description" : "Retrieve all the items that will load when the target OSX system starts.",
      "value" : "Identify malware that uses this persistence mechanism to launch at a given interval"
    },
    "crontab": {
      "query" : "select * from crontab;",
      "interval" : "3600",
      "version" : "1.4.5",
      "description" : "Retrieves all the jobs scheduled in crontab in the target system.",
      "value" : "Identify malware that uses this persistence mechanism to launch at a given interval"
    }
  }
}
```
The first thing we see is the `Queries` key.  This is very similar to the `Schedule` key we are already familiar with.
It is simply the top level key in a map of named queries.

The named queries, however, are introducing some new key/value pairs within them that we haven't before.  
The important keys here are `platform` and `version`

The `platform` key is used to specify the operating system that the query will run on.  In this way, you can 
specify OS specific table queries to only run when osquery is on that particular Operating System.  If this Key is ommited,
the query is run on all Operating Systems.

the `version` key describes the minimum required version of osquery for a query to run on.  This can be useful,
as newer tables may not be  in older version of osquery.  

Lastly, the `description` and `value` keys provide context for the query. They should be relatively self explanatory,
but its important to remember to include them when writing new queries.  Just like comments in code, you'll be glad you
included them when you come back to a query months later and can't remember what it w as used for.

More documentation on some lesser used options can also be found [here](https://github.com/facebook/osquery/blob/master/docs/wiki/deployment/configuration.md#schedule)

NOTE:  While it is possible to use the platform key inside a query to define what systems it will run on,
in practice I have found that managing packs with different queries that only run on certain Operating Systems
becomes unweildy and hard to manage.  This is because after a pack has more than a few  queries in it, it is 
very difficult to remember which query is located in which pack, what system it applies to, and  so forth.

I recommend instead created os-specific packs naming them according to both OS and function.  EG:
`windows-incident-response.json`, `osx-threat-hunting.json` etc.

That's about it for the basics of an osquery configuration.  Wahoo, on to the fun stuff!

> *This post originally appeared on [blog.securelyinsecure.com](https://blog.securelyinsecure.com/post/deploying-osquery-pt2/).*