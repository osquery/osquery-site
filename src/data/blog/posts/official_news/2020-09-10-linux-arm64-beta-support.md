---
title:  "Linux ARM64 Beta Support"
author: "Alessandro Gario"
date: "2020-09-20 17:00"
---

We would like to announce beta support for Linux arm64/aarch64. And we are working diligently towards official releases and support for more operating systems. If you would like to test, please find beta packages for the 4.5.0 tag here:


| Type    |    Filename / sha256  |
|:------|:-------|
| Tarball        | [osquery-4.5.0\_1.linux\_aarch64.tar.gz](https://pkg.osquery.io/osquery-4.5.0_1.linux_aarch64.tar) `19880dac2dc1ea7d1a5fbc5f91c3a8c55b26e64cfe402306bc78032c7b97f721` |
| Debian         | [osquery\_4.5.0-1.linux\_arm64.deb](https://pkg.osquery.io/osquery_4.5.0-1.linux_arm64.deb) `f5d58f03200c26eadc2bf1e783fe56e264301ac892c8828cea16dadca475ad7b` |
| Debian&nbsp;(Debug) | [osquery-dbgsym_4.5.0-1.linux\_arm64.ddeb](https://pkg.osquery.io/osquery-dbgsym_4.5.0-1.linux_arm64.ddeb) `f48db8c4182213cc61707de4d9dcaa90005a996710e52de7b5cba20c0cbfabf9` |
| RPM            | [osquery-4.5.0-1.aarch64.rpm](https://pkg.osquery.io/osquery-4.5.0-1.aarch64.rpm) `fa4d17a5cdb3ec67989b3f275996fea92bec9ca62a01e6f5679863782d5d2dda` |
| RPM&nbsp;(Debug)    | [osquery-debuginfo-4.5.0-1.aarch64.rpm](https://pkg.osquery.io/osquery-debuginfo-4.5.0-1.aarch64.rpm) `67608cfc6fed0479e8e47b9562235397fc7a459f471ee6f02adc3a0592aa6ce6` |



They should follow the same portability expectations as x86, and work on any Linux distribution released since 2011.

Bugs and incompatibilities should be filled as GitHub [issues](https://github.com/osquery/osquery/issues) on the osquery repository. Questions, comments, and discussions are taking place in the Slack channel `#arm-architecture` ([request an invite!](https://join.slack.com/t/osquery/shared_invite/zt-h29zm0gk-s2DBtGUTW4CFel0f0IjTEw))

And of course if you would like to build osquery for aarch64 yourself, please follow our [building](https://osquery.readthedocs.io/en/latest/development/building/) guide. But use the [aarch64](https://github.com/osquery/osquery-toolchain/releases/download/1.1.0/osquery-toolchain-1.1.0-aarch64.tar.xz) version of our toolchain.

A big thanks to everyone who made this possible, and specifically [artemist](https://github.com/artemist), [lizthegrey](https://github.com/lizthegrey), and [ozbenh](https://github.com/ozbenh).
