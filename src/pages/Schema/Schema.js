import React, { Component } from 'react'
import { func, shape, string } from 'prop-types'
import { withRouter } from 'react-router'

import Button from 'components/Button'
import OsqueryVersionDropdown from 'components/forms/fields/OsqueryVersionDropdown'
import LabelText from 'components/text/LabelText'
import OsqueryTable from 'components/OsqueryTable'
import PlatformDropdown from 'components/forms/fields/PlatformDropdown'
import SchemaTOC from 'components/SchemaTOC'
import './Schema.css'
import osqueryVersionsData from 'data/osquery_versions.json'

const baseClass = 'schema'
const currentOsqueryVersion = osqueryVersionsData.find(osqueryVersion => osqueryVersion.isCurrent)

class Schema extends Component {
  static propTypes = {
    history: shape({
      location: shape({
        search: string,
      }).isRequired,
      push: func.isRequired,
    }),
    match: shape({
      params: shape({
        schemaVersion: string,
      }),
    }),
  }

  static initialState = {
    platforms: {
      darwin: false,
      freebsd: false,
      linux: false,
      windows: false,
    },
  }

  state = Schema.initialState

  humanFriendlyPlatforms = () => {
    const { selectedPlatforms } = this
    const { platforms } = this.state

    if (selectedPlatforms().length === Object.entries(platforms).length) return 'All platforms'

    return selectedPlatforms()
      .join(', ')
      .replace('darwin', 'macOS')
      .replace('freebsd', 'FreeBSD')
      .replace('linux', 'Linux')
      .replace('windows', 'Windows')
  }

  onPlatformChange = platforms => {
    this.setState({ platforms })
  }

  onSchemaChange = ({ value }) => {
    const { push } = this.props.history

    return push(`/schema/${value}`)
  }

  restoreDefaultView = () => {
    const { push } = this.props.history

    this.setState(Schema.initialState, () => push(`/schema/${currentOsqueryVersion.version}`))
  }

  schema = () => {
    const { match } = this.props

    return require(`data/osquery_schema_versions/${match.params.schemaVersion}`)
  }

  selectedPlatforms = () => {
    const { platforms } = this.state

    return Object.entries(platforms)
      .filter(platform => platform[1])
      .map(platform => platform[0])
  }

  tables = () => {
    const { schema, selectedPlatforms } = this

    return schema().filter(table => {
      return selectedPlatforms().every(selectedPlatform => {
        return table.platforms.includes(selectedPlatform)
      })
    })
  }

  renderTables = () => {
    const { tables } = this

    return tables().map(table => {
      return <OsqueryTable className={`${baseClass}__table`} key={table.name} tableData={table} />
    })
  }

  renderTOC = () => {
    const { tables } = this
    const { location } = this.props
    const entries = tables().map(table => table.name)
    const activeEntry = location.hash.replace('#', '')

    return (
      <div className={`${baseClass}__toc-wrapper`}>
        <h2 className={`${baseClass}__toc-header`}>
          <span className={`${baseClass}__tables-count`}>{entries.length}</span>
          {`Table${entries.length > 1 ? 's' : ''}`}
        </h2>

        <SchemaTOC activeEntry={activeEntry} entries={entries} />
      </div>
    )
  }

  render() {
    const {
      humanFriendlyPlatforms,
      onPlatformChange,
      onSchemaChange,
      renderTables,
      renderTOC,
      restoreDefaultView,
    } = this
    const { match } = this.props
    const { platforms } = this.state

    return (
      <div className={baseClass}>
        {renderTOC()}

        <div className={`${baseClass}__main`}>
          <div className={`${baseClass}__tables-wrapper`}>
            <div className={`${baseClass}__refinements`}>
              <div className={`${baseClass}__schema-selector`}>
                <LabelText>Osquery Version:</LabelText>

                <OsqueryVersionDropdown
                  className={`${baseClass}__schema-dropdown`}
                  name="schema-version"
                  onChange={onSchemaChange}
                  value={match.params.schemaVersion}
                />
              </div>
            </div>

            <div className={`${baseClass}__filters`}>
              <div className={`${baseClass}__platform-filter`}>
                <LabelText>Show only Tables compatible with:</LabelText>

                <PlatformDropdown
                  className={`${baseClass}__platform-dropdown`}
                  onChange={onPlatformChange}
                  platforms={platforms}
                >
                  {humanFriendlyPlatforms()}
                </PlatformDropdown>
              </div>

              <Button
                className={`${baseClass}__restore-default-button`}
                onClick={restoreDefaultView}
                variant="link"
              >
                Restore Default View
              </Button>
            </div>

            {renderTables()}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Schema)
