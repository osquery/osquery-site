import React, { Component } from 'react'
import { bool, string } from 'prop-types'

import Apple from 'components/Icon/svg/Apple.svg.js'
import BackArrow from 'components/Icon/svg/BackArrow.svg.js'
import Calendars from 'components/Icon/svg/Calendars.svg.js'
import Centos from 'components/Icon/svg/Centos.svg.js'
import Cpu from 'components/Icon/svg/Cpu.svg.js'
import DownCarat from 'components/Icon/svg/DownCarat.svg.js'
import GithubMark from 'components/Icon/svg/GithubMark.svg.js'
import LinuxFoundationLogo from 'components/Icon/svg/LinuxFoundationLogo.svg.js'
import FrameOverlay from 'components/Icon/svg/FrameOverlay.svg.js'
import FreeBSD from 'components/Icon/svg/FreeBSD.svg.js'
import Imac from 'components/Icon/svg/Imac.svg.js'
import ImacLg from 'components/Icon/svg/ImacLg.svg.js'
import Linux from 'components/Icon/svg/Linux.svg.js'
import MacFinder from 'components/Icon/svg/MacFinder.svg.js'
import Octocat from 'components/Icon/svg/Octocat.svg.js'
import Osquery from 'components/Icon/svg/Osquery.svg.js'
import OsqueryDocs from 'components/Icon/svg/OsqueryDocs.svg.js'
import ShellHistory from 'components/Icon/svg/ShellHistory.svg.js'
import Slack from 'components/Icon/svg/Slack.svg.js'
import SlackText from 'components/Icon/svg/SlackText.svg.js'
import Star from 'components/Icon/svg/Star.svg.js'
import Ubuntu from 'components/Icon/svg/Ubuntu.svg.js'
import Windows from 'components/Icon/svg/Windows.svg.js'
import PushPin from 'components/Icon/svg/PushPin.svg.js'

class Icon extends Component {
  static propTypes = {
    className: string,
    new: bool,
  }

  static iconNames = {
    backArrow: BackArrow,
    calendars: Calendars,
    centos: Centos,
    cpu: Cpu,
    darwin: Apple,
    downCarat: DownCarat,
    githubMark: GithubMark,
    linuxFoundationLogo: LinuxFoundationLogo,
    frameOverlay: FrameOverlay,
    freebsd: FreeBSD,
    imac: Imac,
    imacLg: ImacLg,
    linux: Linux,
    macFinder: MacFinder,
    octocat: Octocat,
    osquery: Osquery,
    osqueryDocs: OsqueryDocs,
    shellHistory: ShellHistory,
    slack: Slack,
    slackText: SlackText,
    star: Star,
    ubuntu: Ubuntu,
    windows: Windows,
    pushPin: PushPin,
  }

  render() {
    const { name } = this.props
    const IconComponent = Icon.iconNames[name]

    if (IconComponent) {
      return <IconComponent {...this.props} />
    }

    throw new Error(`Unknown Icon: ${name}`)
  }
}

export default Icon
