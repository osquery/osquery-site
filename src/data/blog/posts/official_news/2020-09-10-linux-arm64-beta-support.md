---
title:  "Linux ARM64 Beta Support"
author: "Alessandro Gario"
date: "2020-09-18 21:00"
---

We would like to announce beta support for Linux arm64/aarch64. We are working diligently towards official releases and support for more operating systems. If you would like to test, please find beta packages for the 4.5.0 tag here:

> **Update**: We have updated the package links to the most recent 4.7.0 release.

| Type    |    Filename / sha256  |
|:------|:-------|
| Tarball        | [osquery-4.7.0\_1.linux\_aarch64.tar.gz](https://pkg.osquery.io/linux/osquery-4.7.0_1.linux_aarch64.tar.gz) `5f5dac77b3e9b77c172fd9c43258add5aa238868afcba6710b88442388f3c2be` |
| Debian         | [osquery\_4.7.0-1.linux\_arm64.deb](https://pkg.osquery.io/deb/osquery_4.7.0-1.linux_arm64.deb) `5336bec6508bbf74e75f9e3bc369732d4039b1d6bc03587489acdfacfb32c572` |
| Debian&nbsp;(Debug) | [osquery-dbgsym\_4.7.0-1.linux\_arm64.ddeb](https://pkg.osquery.io/deb/osquery-dbgsym_4.7.0-1.linux_arm64.ddeb) `6a4c126785fa60d47e50f44a0e3f7ba07215c312e0c8b9d63ea97dad645262ef` |
| RPM            | [osquery-4.7.0-1.linux.aarch64.rpm](https://pkg.osquery.io/rpm/osquery-4.7.0-1.linux.aarch64.rpm) `dd4c04cac56b520d24d40b1cc6cbe3ac4900afd26f99353968af2a0ba7c5f26d` |
| RPM&nbsp;(Debug)    | [osquery-debuginfo-4.7.0-1.linux.aarch64.rpm](https://pkg.osquery.io/rpm/osquery-debuginfo-4.7.0-1.linux.aarch64.rpm) `92457d7046caee3ebc6405e754284ac04cb600ab54b1a526fa5da1afd36572aa` |



They should follow the same portability expectations as x86, and work on any Linux distribution released since 2011.

Bugs and incompatibilities should be filled as GitHub [issues](https://github.com/osquery/osquery/issues) on the osquery repository. Questions, comments, and discussions are taking place in the Slack channel `#arm-architecture` ([request an invite!](https://join.slack.com/t/osquery/shared_invite/zt-h29zm0gk-s2DBtGUTW4CFel0f0IjTEw))

And of course, if you would like to build osquery for aarch64 yourself, please follow our [building](https://osquery.readthedocs.io/en/latest/development/building/) guide. But use the [aarch64](https://github.com/osquery/osquery-toolchain/releases/download/1.1.0/osquery-toolchain-1.1.0-aarch64.tar.xz) version of our toolchain.

A big thanks to everyone who made this possible, and specifically [artemist](https://github.com/artemist), [lizthegrey](https://github.com/lizthegrey), and [ozbenh](https://github.com/ozbenh).
