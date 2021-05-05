---
title:  "Linux ARM64 Beta Support"
author: "Alessandro Gario"
date: "2020-09-18 21:00"
---

We would like to announce beta support for Linux arm64/aarch64. We are working diligently towards official releases and support for more operating systems. If you would like to test, please find beta packages for the 4.5.0 tag here:

> **Update**: We have updated the package links to the most recent 4.8.0 release.

| Type    |    Filename / sha256  |
|:------|:-------|
| Tarball        | [osquery-4.8.0\_1.linux\_aarch64.tar.gz](https://pkg.osquery.io/linux/osquery-4.8.0_1.linux_aarch64.tar.gz) `61fbd2b5e2f8fd2e65dec91955499eee8639efff289c3279b5ffa2786741a8c4` |
| Debian         | [osquery\_4.8.0-1.linux\_arm64.deb](https://pkg.osquery.io/deb/osquery_4.8.0-1.linux_arm64.deb) `eb48d5a77aab503a3bd0f5d0a642c4fd7b7a86a9754e33bbe49fa68ae855372c` |
| Debian&nbsp;(Debug) | [osquery-dbgsym\_4.8.0-1.linux\_arm64.ddeb](https://pkg.osquery.io/deb/osquery-dbgsym_4.8.0-1.linux_arm64.ddeb) `8102c39cf707ef30890092ceee25af9bf5d348816523aa4f43959bacd5eea66c` |
| RPM            | [osquery-4.8.0-1.linux.aarch64.rpm](https://pkg.osquery.io/rpm/osquery-4.8.0-1.linux.aarch64.rpm) `8e58bff947b287a9e7659208d152fe0873226b698ba7a229a3439ff1c667a4b1` |
| RPM&nbsp;(Debug)    | [osquery-debuginfo-4.8.0-1.linux.aarch64.rpm](https://pkg.osquery.io/rpm/osquery-debuginfo-4.8.0-1.linux.aarch64.rpm) `db6daf10b286ee4ce910640c99bb584b50155e08867ea36cde1e324ba9744be1` |



They should follow the same portability expectations as x86, and work on any Linux distribution released since 2011.

Bugs and incompatibilities should be filled as GitHub [issues](https://github.com/osquery/osquery/issues) on the osquery repository. Questions, comments, and discussions are taking place in the Slack channel `#arm-architecture` ([request an invite!](https://join.slack.com/t/osquery/shared_invite/zt-h29zm0gk-s2DBtGUTW4CFel0f0IjTEw))

And of course, if you would like to build osquery for aarch64 yourself, please follow our [building](https://osquery.readthedocs.io/en/latest/development/building/) guide. But use the [aarch64](https://github.com/osquery/osquery-toolchain/releases/download/1.1.0/osquery-toolchain-1.1.0-aarch64.tar.xz) version of our toolchain.

A big thanks to everyone who made this possible, and specifically [artemist](https://github.com/artemist), [lizthegrey](https://github.com/lizthegrey), and [ozbenh](https://github.com/ozbenh).
