---
title: "Deploying osquery part 1"
author: "Security Clippy"
date: "2017-12-03"
---

Ok, so you've done some quick reading or perhaps someone told you about how friggin awesome osquery is and how
they've used it to solve world hunger in their new fancy startup.  Maybe you read a cool article on
\<random infosec news site>.  Osquery sounds really awesome and you're ready to go hog-wild.  Let's DO THIS!!

Perfect.  That's what this series of blog posts is for.  Osquery is incredibly powerful and getting started can seem
pretty easy (it is).

However, as soon as you start talking production deployments, things get a little more tricky.
Things like configuration management, log collection, managing query packs, running ad-hoc/on-demand/live queries come up and
deciding how you want to handle all these questions requires some knowledge about how everything fits together

This series of posts will aim to start simple and visit many of the possible deployment configurations, how to manage them,
when they are appropriate and so on.  This is where it all starts


## Deployment 1:  It doesn't get any simpler than this.

The first deployment we're going to talk about is your getting started deployment.  One host, running osquery locally,
logging locally, managed locally.

Lets take a look at the default osquery configuration file and talk a bit about what it means.
we'll start with a fresh install on an ubuntu 16.04 system.  As of 12/3/2017, the version of osquery available via repositories is 2.10.2-1, so we'll be using that in this post

[https://osquery.readthedocs.io/en/stable/installation/install-linux/](https://osquery.readthedocs.io/en/stable/installation/install-linux/)

```commandline
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 1484120AC4E9F8A1A577AEEE97A80C63C9D8B80B
sudo add-apt-repository "deb [arch=amd64] https://osquery-packages.s3.amazonaws.com/xenial xenial main"
sudo apt-get update
sudo apt-get install osquery

Setting up osquery (2.10.2-1.linux) ...
```

This will drop our basic config into `/usr/share/osquery/osquery.example.conf`

Here is a snip of the "options" section of the configuration.  This where the core osquery configuration options will be set or changed, so its important to know what they all mean.  Onwards!

```commandline
cat /usr/share/osquery/osquery.example.conf
{
  // Configure the daemon below:
  "options": {
    // Select the osquery config plugin.
    "config_plugin": "filesystem",

    // Select the osquery logging plugin.
    "logger_plugin": "filesystem",

    // The log directory stores info, warning, and errors.
    // If the daemon uses the 'filesystem' logging retriever then the log_dir
    // will also contain the query results.
    //"logger_path": "/var/log/osquery",

    // Set 'disable_logging' to true to prevent writing any info, warning, error
    // logs. If a logging plugin is selected it will still write query results.
    //"disable_logging": "false",

    // Splay the scheduled interval for queries.
    // This is very helpful to prevent system performance impact when scheduling
    // large numbers of queries that run a smaller or similar intervals.
    //"schedule_splay_percent": "10",

    // A filesystem path for disk-based backing storage used for events and
    // query results differentials. See also 'use_in_memory_database'.
    //"database_path": "/var/osquery/osquery.db",

    // Comma-delimited list of table names to be disabled.
    // This allows osquery to be launched without certain tables.
    //"disable_tables": "foo_bar,time",

    "utc": "true"
  }
  --- <snip> ---
```

There are a ton of comments in this file to help you get started, which is awesome.  However, it's also a bit cluttered and
hard to read, so below is a cleaned up version.  Note also that several options are commented out in the example config, so we will get rid of those for now too


```commandline
{
  "options": {
    "config_plugin": "filesystem",
    "logger_plugin": "filesystem",
    "utc": "true"
  }
  --- <snip> ---
```

Simple!  There are now just 3 configuration **options which are being used to configure osquery.  Let's talk about that they mean...

```json
"config_plugin": "filesystem",
```
This first key/value pair tells osquery where to get its configuration from.  In this case, it is telling osquery to
read its configuration from the filesystem.  This file is located in different paths depending on your Operating System, but for
our demo linux system, the default path is `/etc/osquery/osquery.conf`

There is, however, just one small problem.  If this config file is telling osquery to use the configuration file on
the local file system... that's kinda self referencing.  This config tells osquery to use itself as the config, which it's already doing...

Which means now is a great time to introduce another piece of the puzzle, the [osquery flags file!](https://osquery.readthedocs.io/en/stable/installation/cli-flags/)

Just like you can start most cmd line programs with a series of flags, osquery can take in a series of flags to configure
various options.  This list of flags can become pretty cumbersome though, so we turn to a file that contains all the flags that we need to
bootstrap osquery.

Just as listed in the config file options, we can tell osquery to look to the filesystem for its config.  Passing this option
on the command line looks like this:
```commandline
sudo osqueryd --config_plugin=filesystem
```

However, when we run that right now, we end up with this error:
```commandline
sudo osqueryd --config_plugin=filesystem
W1203 16:30:26.415324 40166 init.cpp:655] Error reading config: config file does not exist: /etc/osquery/osquery.conf
```

Woops!  Remember how I mentioned that the default config lives in `/etc/osquery/osquery.conf`?  Well, it turns out we need to
create that file, since we were originally looking at the example file, NOT the actual config file.  Osquery docs even
tell us exactly that [at the bottom of the installation page](https://osquery.readthedocs.io/en/stable/installation/install-linux/)

```commandline
sudo cp /usr/share/osquery/osquery.example.conf /etc/osquery/osquery.conf
```

Now when we start osquery we get...

```commandline
sudo osqueryd --config_plugin=filesystem
....
```

Hrmm, that doesn't look like much.  We can't really see anything happening but if we switch to another window and look
for osquery, we can see something running!

```commandline
sudo ps aux | grep osquery
root      40318  0.0  0.0  61864  3700 pts/3    SN+  16:34   0:00 sudo osqueryd --config_plugin=filesystem
root      40319  0.0  0.3 130276 15704 pts/3    SNl+ 16:34   0:00 osqueryd --config_plugin=filesystem
root      40321  0.0  0.4 272108 16620 pts/3    SNl+ 16:34   0:00 osqueryd
```

Let's introduce another command line flag real quick, which will help us understand things a bit better.  the `--verbose`
flag will give us a more telling output on what's happening
```commandline
sudo osqueryd --verbose
I1203 16:45:52.404359 40761 init.cpp:382] osquery initialized [version=2.10.2]
I1203 16:45:52.418032 40761 system.cpp:343] Found stale process for osqueryd (40718)
I1203 16:45:52.418138 40761 system.cpp:376] Writing osqueryd pid (40761) to /var/run/osqueryd.pidfile
I1203 16:45:52.418210 40761 extensions.cpp:288] Could not autoload extensions: Failed reading: /etc/osquery/extensions.load
I1203 16:45:52.418826 40762 watcher.cpp:520] osqueryd watcher (40761) executing worker (40763)
I1203 16:45:52.424192 40763 init.cpp:379] osquery worker initialized [watcher=40761]
I1203 16:45:52.424316 40763 rocksdb.cpp:132] Opening RocksDB handle: /var/osquery/osquery.db
I1203 16:45:52.431100 40770 interface.cpp:327] Extension manager service starting: /var/osquery/osquery.em
I1203 16:45:52.442476 40763 smbios_tables.cpp:102] Reading SMBIOS from sysfs DMI node
```

Success!

Now back to our flags file.

The same option we just set on the command line, can also be set in the flags file. To do so, we need to create our flags file
and put our option in it.  This is as simple as opening up the file we'd like to create. dropping the option
into it, and saving.

```commandline
sudo vim /etc/osquery/osquery.flags
```
```commandline
sudo cat /etc/osquery/osquery.flags
--config_plugin=filesystem
```

One more thing to do here.  While osqueryd, when started as a service, reads the flags file from
`/etc/osquery/osquery.flags,` when running it in the foreground by doing a `sudo osquery`, it actually reads from
`/etc/osquery/osquery.flags.default`.  Because we want these files to be exactly the same, we can just symlink
`osquery.flags` -> `osquery.flags.default`

```commandline
sudo ln -s /etc/osquery/osquery.flags /etc/osquery/osquery.flags.default
```

Let's start osqueryd again in verbose mode and see what we get...

```commandline
sudo osqueryd --verbose
I1203 16:58:25.600335 41255 init.cpp:382] osquery initialized [version=2.10.2]
I1203 16:58:25.600394 41255 init.cpp:389] Using default flagfile: /etc/osquery/osquery.flags.default
I1203 16:58:25.611605 41255 system.cpp:343] Found stale process for osqueryd (41217)
I1203 16:58:25.611670 41255 system.cpp:376] Writing osqueryd pid (41255) to /var/run/osqueryd.pidfile
```

Wahooo!  Osqueryd picked up our default flags file and is now using that to decide where to read its config from!


### It's all over but the crying

All that and we've only touched on a SINGLE line of our original config file.  Fortunately what we just did gets us
set up pretty well to dig into osquery further, so we don't need much else to tackle the last two options in our
config file.

```json
"logger_plugin": "filesystem",
```

This option tells osquery where to send the logs that it generates.  There are quite a few different places osquery
cand send its log data, but for now we're just going to stick with the filesystem.  This defaults to `/var/log/osquery/*`
on linux.  The __main__ takeaway here is that you know osquery is capable of sending logs elsewhere.  This become
very important when we start talking about more complicated deployments, shipping logs off-system for analysis, etc.


```json
"utc": "true"
```
This option is even more simple.  It tells osquery to log everythign with a UTC timestamp.  That's it.

&nbsp;

Wahoo, we're done!  That was actually quite a lot to cover, but we should be pretty well set to start working with
osquery and moving on to some more practical implementations and deployments soon.  Stay tuned for more blog posts
exploring more things you can do with osquery soon!

> *This post originally appeared on [blog.securelyinsecure.com](https://blog.securelyinsecure.com/post/deploying-osquery-pt1/).*
