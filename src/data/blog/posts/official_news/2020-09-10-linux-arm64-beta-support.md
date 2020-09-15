---
title:  "Linux ARM64 Beta Support"
author: "Alessandro Gario"
date: "2020-09-20 17:00"
---

We would like to announce beta support for Linux arm64/aarch64. And we are working diligently towards official releases and support for more operating systems. If you would like to test, please find beta packages for the 4.5.0 tag here:


| Type    |    Filename / sha256  |
|:------|:-------|
| Tarball        | [osquery-4.5.0\_1.linux\_aarch64.tar.gz](https://pkg.osquery.io/linux/osquery-4.5.0_1.linux_aarch64.tar) `b26929aceb2cc84511ba7d02bb22a092eb17047c54487df60c487ac880f79c02` |
| Debian         | [osquery\_4.5.0\_1.linux.arm64.deb](https://pkg.osquery.io/deb/osquery_4.5.0_1.linux.arm64.deb) `5502cc70fa38ea7e8a6bc243ec16ca90ac1443fc9fd7c15ec9cfd28aa35f0900` |
| Debian&nbsp;(Debug) | [osquery-dbgsym_4.5.0\_1.linux.arm64.ddeb](https://pkg.osquery.io/deb/osquery-dbgsym_4.5.0_1.linux.arm64.deb) `4e63a8605519fc51095e7ef70f3f9ae93adcb7aef29ca1a398caf2f3f77b73fb` |
| RPM            | [osquery-4.5.0-1.linux.aarch64.rpm](https://pkg.osquery.io/rpm/osquery-4.5.0-1.linux.aarch64.rpm) `1d482d9151d58d58af519470595f2968c75b389426e6b8f80a742058966c1b05` |
| RPM&nbsp;(Debug)    | [osquery-debuginfo-4.5.0-1.linux.aarch64.rpm](https://pkg.osquery.io/rpm/osquery-debuginfo-4.5.0-1.linux.aarch64.rpm) `a9af73b2e465ceaa6b2954ec401d458443dc8d0d0dc003c65f5d84f620a5c609` |



They should follow the same portability expectations as x86, and work on any Linux distribution released since 2011.

Bugs and incompatibilities should be filled as GitHub [issues](https://github.com/osquery/osquery/issues) on the osquery repository. Questions, comments, and discussions are taking place in the Slack channel `#arm-architecture` ([request an invite!](https://join.slack.com/t/osquery/shared_invite/zt-h29zm0gk-s2DBtGUTW4CFel0f0IjTEw))

And of course if you would like to build osquery for aarch64 yourself, please follow our [building](https://osquery.readthedocs.io/en/latest/development/building/) guide. But use the [aarch64](https://github.com/osquery/osquery-toolchain/releases/download/1.1.0/osquery-toolchain-1.1.0-aarch64.tar.xz) version of our toolchain.

A big thanks to everyone who made this possible, and specifically [artemist](https://github.com/artemist), [lizthegrey](https://github.com/lizthegrey), and [ozbenh](https://github.com/ozbenh).
