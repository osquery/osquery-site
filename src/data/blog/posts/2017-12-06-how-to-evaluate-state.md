---
title: "How to evaluate the state of your mac Hardware in situ and generate
insights."
author: "Theodore Reed"
date: "2017-12-06"
---

## What is osquery?

Osquery is an open source tool created by Facebook for querying various
information about the state of your machines. This includes information like:

* Running processes
* Kernel modules loaded
* Active user accounts
* Active network connections
* And much more!

Osquery allows you to craft your system queries using SQL statements, making it
easy to use by security engineers that are already familiar with SQL.

Osquery is a flexible tool that can be used for a variety of use cases to
troubleshoot performance and operational issues. From a security perspective, it
can be used to query your endpoints to detect, investigate, and proactively hunt
for various types of threats. For example: if you suspect a malicious process is
running on a system, you can query for the process by name or even a filename it
has open. We'll talk about some more of these below.

```
$ export OSQUERY_KEY=1484120AC4E9F8A1A577AEEE97A80C63C9D8B80B
$ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys $OSQUERY_KEY
$ sudo add-apt-repository "deb [arch=amd64] https://pkg.osquery.io/deb deb main"
$ sudo apt-get update
$ sudo apt-get install osquery
```

As you can see, you can use standard SQL including limits, aggregates, and joins, you can ask powerful questions about your infrastructure! And you’re not just limited to process information – you can view the full list of ‘tables’ you can query from in the documentation (plus we’ll explore more in the examples below).

## Deploying osquery

Osquery is agent software that must run directly on your endpoints (e.g, your OSX installation or Linux servers). Osquery will require root or system privileges to get a lot of detailed system information, although it is possible to glean some information when not ran as `root`. For more information, see the official deployment guide.
One important thing to note as you plan your deployments is that are two main ways to deploy osquery depending on your use case(s).

* For performing ad-hoc queries, you only need osqueryi (the command line tool). This deployment is useful in DFIR use cases where you are only using osquery in response to detection events from other tools. OSQuery information can be used to perform or supplement other live forensics or incident response tasks, e.g. logging into and running osqueryi queries to pinpoint the endpoint process that has triggered a network indicator to fire. The pros to this type of deployment is that it’s extremely lightweight and unlikely to have any impact to the endpoint users or application. The downsides are that without other additional automation or tooling, it’s hard to use osquery to detect active threats.

