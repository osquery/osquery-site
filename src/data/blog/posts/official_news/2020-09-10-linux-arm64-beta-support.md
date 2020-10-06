---
title:  "Linux ARM64 Beta Support"
author: "Alessandro Gario"
date: "2020-09-18 21:00"
---

We would like to announce beta support for Linux arm64/aarch64. We are working diligently towards official releases and support for more operating systems. If you would like to test, please find beta packages for the 4.5.0 tag here:

> **Update**: We have updated the package links to the most recent 4.5.1 release.

| Type    |    Filename / sha256  |
|:------|:-------|
| Tarball        | [osquery-4.5.1\_1.linux\_aarch64.tar.gz](https://pkg.osquery.io/linux/osquery-4.5.1_1.linux_aarch64.tar.gz) `7d8f156ea206655da3c465c4c19443e2c2b97e4d3f9f7ab41d16ec891886c58a` |
| Debian         | [osquery\_4.5.1\_1.linux.arm64.deb](https://pkg.osquery.io/deb/osquery_4.5.1_1.linux.arm64.deb) `af0b1c93a70b66af1c8c851a7a2e8e0fba8c23cc5046c53afe9c33fc2ca65e48` |
| Debian&nbsp;(Debug) | [osquery-dbgsym_4.5.1\_1.linux.arm64.deb](https://pkg.osquery.io/deb/osquery-dbgsym_4.5.1_1.linux.arm64.deb) `fda339c59567bcb56b4e5a1d42b65de50a874acaa08279299fd1c33ae38f121a` |
| RPM            | [osquery-4.5.1-1.linux.aarch64.rpm](https://pkg.osquery.io/rpm/osquery-4.5.1-1.linux.aarch64.rpm) `b6cff1fe07ca84238394f1e13af9b96deb262b261b378ad00cf77cbe064734a2` |
| RPM&nbsp;(Debug)    | [osquery-debuginfo-4.5.1-1.linux.aarch64.rpm](https://pkg.osquery.io/rpm/osquery-debuginfo-4.5.1-1.linux.aarch64.rpm) `1be8fd762836f8f6de5850a1b62908e14534f2826e84eef590958e677b8762ae` |



They should follow the same portability expectations as x86, and work on any Linux distribution released since 2011.

Bugs and incompatibilities should be filled as GitHub [issues](https://github.com/osquery/osquery/issues) on the osquery repository. Questions, comments, and discussions are taking place in the Slack channel `#arm-architecture` ([request an invite!](https://join.slack.com/t/osquery/shared_invite/zt-h29zm0gk-s2DBtGUTW4CFel0f0IjTEw))

And of course, if you would like to build osquery for aarch64 yourself, please follow our [building](https://osquery.readthedocs.io/en/latest/development/building/) guide. But use the [aarch64](https://github.com/osquery/osquery-toolchain/releases/download/1.1.0/osquery-toolchain-1.1.0-aarch64.tar.xz) version of our toolchain.

A big thanks to everyone who made this possible, and specifically [artemist](https://github.com/artemist), [lizthegrey](https://github.com/lizthegrey), and [ozbenh](https://github.com/ozbenh).
