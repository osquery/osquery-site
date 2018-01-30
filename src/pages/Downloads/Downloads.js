import React, { Component } from 'react'
import { withRouter } from 'react-router'

import content from 'data/pages/downloads.json'
import DownloadCard from 'components/DownloadCard'
import Heading1 from 'components/text/Heading1'
import Heading2 from 'components/text/Heading2'
import Heading5 from 'components/text/Heading5'
import Icon from 'components/Icon'
import Monospace from 'components/text/Monospace'
import NotFound from 'pages/NotFound'
import OsqueryVersionDropdown from 'components/forms/fields/OsqueryVersionDropdown'
import Paragraph from 'components/text/Paragraph'
import schemaVersionExists from 'helpers/schema_version_exists'
import Tab from 'components/Tab'
import Terminal from 'components/terminals/Terminal'
import './Downloads.css'

const DEBUG = 'debug'
const OFFICIAL = 'official'

const baseClass = 'downloads-page'
const installOptionNames = {
  darwin: 'macOS',
  ubuntu: 'Debian Linux',
  centos: 'RPM Linux',
  freebsd: 'FreeBSD',
  windows: 'Windows',
}
const installOptionNamesKeys = Object.keys(installOptionNames)
const installOptionNamesValues = Object.values(installOptionNames)

class Downloads extends Component {
  state = {
    selectedInstallOption: 'darwin',
  }

  onInstallOptionChange = installOption => {
    return () => {
      this.setState({ selectedInstallOption: installOption })
    }
  }

  onOsqueryVersionChange = option => {
    if (option) {
      const { history, match } = this.props

      history.push(`/downloads/${match.params.release_type}/${option.value}`)
    }
  }

  onReleaseTypeChange = releaseType => {
    return () => {
      const { history, match } = this.props

      history.push(`/downloads/${releaseType}/${match.params.osquery_version}`)
    }
  }

  render() {
    const { match } = this.props
    const { onInstallOptionChange, onOsqueryVersionChange, onReleaseTypeChange } = this
    const { osquery_version: osqueryVersion, release_type: releaseType } = match.params
    const { selectedInstallOption } = this.state
    const alternativeInstallOptionContent =
      content.sections.alternativeInstallationOptions.subheadings[selectedInstallOption]
    const downloadsDataForOsqueryVersion = require(`data/osquery_package_versions/${
      osqueryVersion
    }`)

    if (!schemaVersionExists(osqueryVersion) || ![DEBUG, OFFICIAL].includes(releaseType)) {
      return <NotFound />
    }

    return (
      <div className={`${baseClass}__page-wrapper`}>
        <section className={`${baseClass}__title-section`}>
          <Heading1>{content.sections.hero.sectionHeading}</Heading1>
        </section>

        <div className={`section-break ${baseClass}__section-break`} />

        <section className={`${baseClass}__packages-section`}>
          <Heading2>{content.sections.packages.sectionHeading}</Heading2>

          <Paragraph>{content.sections.packages.sectionSubheading}</Paragraph>

          <Heading5 className={`${baseClass}__osquery-version`}>Osquery Version</Heading5>

          <OsqueryVersionDropdown
            className={`${baseClass}__dropdown`}
            name="dropdown"
            onChange={onOsqueryVersionChange}
            value={osqueryVersion}
          />

          <Heading5 className={`${baseClass}__osquery-version`}>Release Type</Heading5>

          <Tab
            active={releaseType === OFFICIAL}
            className={`${baseClass}__tab ${baseClass}__tab--official`}
            onClick={onReleaseTypeChange(OFFICIAL)}
            text="Official"
          />

          <Tab
            active={releaseType === DEBUG}
            className={`${baseClass}__tab`}
            onClick={onReleaseTypeChange(DEBUG)}
            text="Debug"
          />

          <div className={`section-break ${baseClass}__section-break`} />

          <div className={`${baseClass}__downloads-wrapper`}>
            {downloadsDataForOsqueryVersion.downloads[releaseType].map((data, idx) => {
              return (
                <DownloadCard
                  className={`${baseClass}__download-card`}
                  downloadData={data}
                  key={`download-card-${idx}`}
                />
              )
            })}
          </div>
        </section>

        <div className={`section-break ${baseClass}__section-break`} />

        <section className={`${baseClass}__alternative-install-section`}>
          <Heading2>Alternative Install Options</Heading2>

          <div className={`${baseClass}__pill-wrapper`}>
            {installOptionNamesValues.map((installOptionName, idx) => {
              const iconName = installOptionNamesKeys[idx]

              return (
                <Tab
                  active={iconName === selectedInstallOption}
                  className={`${baseClass}__install-pill`}
                  key={`install-option-${idx}`}
                  onClick={onInstallOptionChange(iconName)}
                  text={installOptionName}
                />
              )
            })}
          </div>

          <Icon
            className={`${baseClass}__install-icon`}
            fillColor="#eaeaea"
            name={selectedInstallOption}
          />

          <div>
            <Heading5>{alternativeInstallOptionContent.subSection1Heading}</Heading5>

            <Paragraph>{alternativeInstallOptionContent.subSection1Paragraph1}</Paragraph>
          </div>

          <Terminal.Wrapper className={`${baseClass}__terminal`}>
            <Terminal.Body className={`${baseClass}__terminal-body`}>
              {alternativeInstallOptionContent.terminalCommands.map((terminalCommand, idx) => {
                return <Monospace key={`terminal-command-${idx}`}>$ {terminalCommand}</Monospace>
              })}
            </Terminal.Body>
          </Terminal.Wrapper>
        </section>
      </div>
    )
  }
}

export default withRouter(Downloads)
