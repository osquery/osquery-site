---
title:  "osquery lockdown update 2"
author: "Filipe Manco"
date: "2018-11-14 21:00"
---

As we [announced](https://osquery.io/blog/osquery-lockdown) earlier, we have been exploring ways to improve our development workflow. As a result of this effort, we will implement the following changes.

## Development workflow

The osquery project has so far been developed fully on GitHub. This means the core team goes through the same flow as the osquery community to get their code merged. This workflow has reached a point at which it's no longer scalable and is making us all less efficient. This is mostly due to the lack of integration with our internal development environment.

To address this challenge, the core team will begin using Phabricator, Facebook's code management system, to submit and review code. Code from the community will continue to be submitted as GitHub Pull Requests (PRs) and reviewed on GitHub. Here are the new workflows:

**Core Team**: The core team will submit and review code using Phabricator. Phabricator will then push the internal commits to the osquery master branch on GitHub. Since there won't be a PR attached to these commits, they will have a commit message describing the changes.

**Community**: From the community standpoint, the workflow will remain mostly the same: developers will submit PRs which the core team will then review — all on GitHub. The only difference lies in how the PRs will be merged: 

* Instead of merging PRs on GitHub, we will import them to Phabricator
* Phabricator will then generate a commit and push it to the master branch on GitHub
* The Pull Request will then be closed. 

This is to guarantee consistency between the internal and external versions so they can be kept in sync.

The sync between Phabricator and GitHub will be done using [ShipIt](https://github.com/facebook/fbshipit) which is open source. This process has long been deployed at Facebook for various projects. If you're interested to learn more, you're welcome to take a look at [RocksDB](https://github.com/facebook/rocksdb), one of our projects.

## Build system

We will move the osquery build to [Buck](https://github.com/facebook/buck) and discontinue supporting CMake.

Moving to Buck is a necessary step to integrate the osquery build with our internal systems. This integration will spare us from managing Jenkins, providing a more stable infrastructure and allowing us to focus on osquery development.

This move won't be a simple build system change though. We're taking this opportunity to split the osquery build into smaller independent libraries to make the code base more manageable and the build more configurable in the future. We will also integrate dependency management into the build system, so Buck will always know which dependencies to download and include in the build. No more `make deps`, brew or chocolatey required — Buck will handle everything. 

Because of all these changes, we decided to no longer support CMake. Otherwise, it would require us to integrate these significant new changes with CMake and to maintain two separate build systems.

## Rollout of the changes

During the week of November 19 the core team will review and merge any outstanding high-priority bug fixes and release a new osquery version. On Monday, November 26, we will push a commit to the repository containing these changes and will start working with the community to fix any issues using the new workflow and build system. At this point, the freeze will end and we will start accepting new Pull Requests.

We understand that some of these changes might feel disruptive at first, but we believe that they will allow us all to move faster with all community's contributions and make osquery better in the long run.
