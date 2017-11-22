import React, { Component } from 'react'

import Apple from 'components/Icon/svg/Apple.svg.js'
import Centos from 'components/Icon/svg/Centos.svg.js'
import GithubMark from 'components/Icon/svg/GithubMark.svg.js'
import Linux from 'components/Icon/svg/Linux.svg.js'
import Octocat from 'components/Icon/svg/Octocat.svg.js'
import Osquery from 'components/Icon/svg/Osquery.svg.js'
import Slack from 'components/Icon/svg/Slack.svg.js'
import Ubuntu from 'components/Icon/svg/Ubuntu.svg.js'
import Windows from 'components/Icon/svg/Windows.svg.js'

class Icon extends Component {
  static iconNames = {
    apple: Apple,
    centos: Centos,
    githubMark: GithubMark,
    linux: Linux,
    octocat: Octocat,
    osquery: Osquery,
    slack: Slack,
    ubuntu: Ubuntu,
    windows: Windows,
  }

  render() {
    const { name } = this.props
    const IconComponent = Icon.iconNames[name]

    return <IconComponent {...this.props} />
  }
}

export default Icon
