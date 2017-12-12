import React, { Component } from 'react'
import classnames from 'classnames'
import { func, shape, string } from 'prop-types'
import { withRouter } from 'react-router'

import Button from 'components/Button'
import LabelText from 'components/text/LabelText'
import NotFound from 'pages/NotFound'
import OsqueryTable from 'components/OsqueryTable'
import OsqueryVersionDropdown from 'components/forms/fields/OsqueryVersionDropdown'
import osqueryVersionsData from 'data/osquery_versions'
import PlatformDropdown from 'components/forms/fields/PlatformDropdown'
import SchemaTOC from 'components/SchemaTOC'
import schemaVersionExists from 'helpers/schema_version_exists'
import throttle from 'helpers/throttle'
import './Schema.css'

const baseClass = 'schema'
const currentOsqueryVersion = osqueryVersionsData.find(osqueryVersion => osqueryVersion.isCurrent)
let tocOffset

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
    mappedTables: [],
    overrideScroll: false,
    platforms: {
      darwin: false,
      freebsd: false,
      linux: false,
      windows: false,
    },
  }

  state = Schema.initialState

  componentDidMount() {
    const { mapTables, scrollActiveTable, stickyTOC } = this

    mapTables()

    const tocElement = document.getElementById(`${baseClass}-toc`)
    tocOffset = tocElement ? tocElement.offsetTop : 0
    window.addEventListener('scroll', scrollActiveTable)
    window.addEventListener('scroll', stickyTOC)
  }

  componentDidUpdate(prevProps) {
    const { mapTables } = this
    const { schemaVersion } = this.props.match.params
    const oldSchemaVersion = prevProps.match.params.schemaVersion

    if (oldSchemaVersion !== schemaVersion) mapTables()
  }

  componentWillUnmount() {
    const { scrollActiveTable, stickyTOC } = this

    window.removeEventListener('scroll', scrollActiveTable)
    window.removeEventListener('scroll', stickyTOC)
  }

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

  mapTables = () => {
    const { scrollActiveTable, tableNames } = this

    if (!tableNames()) return false

    const mappedTables = tableNames().map(tableName => {
      const domTable = document.getElementById(tableName)

      return {
        id: tableName,
        offset: domTable.offsetTop + 40,
      }
    })

    this.setState({ mappedTables }, () => scrollActiveTable())
  }

  onPlatformChange = platforms => {
    const { mapTables } = this

    this.setState({ platforms }, () => mapTables())
  }

  onSchemaChange = ({ value }) => {
    const { push } = this.props.history

    return push(`/schema/${value}`)
  }

  restoreDefaultView = () => {
    const { mapTables } = this
    const { push } = this.props.history

    this.setState(Schema.initialState, () => {
      push(`/schema/${currentOsqueryVersion.version}`)
      mapTables()
    })
  }

  schema = () => {
    const { schemaVersion } = this.props.match.params

    if (!schemaVersionExists(schemaVersion)) return false

    return require(`data/osquery_schema_versions/${schemaVersion}`)
  }

  scrollActiveTable = throttle(() => {
    const { mappedTables, overrideScroll } = this.state
    const windowScroll = global.window.scrollY

    const activeTable =
      mappedTables.find(table => {
        return table.offset > windowScroll
      }) || mappedTables[mappedTables.length - 1]

    if (!overrideScroll) {
      if (activeTable) {
        this.setState({ activeTable: activeTable.id, overrideScroll: false })
      }

      return false
    }

    this.setState({ overrideScroll: false })
  })

  selectedPlatforms = () => {
    const { platforms } = this.state

    return Object.entries(platforms)
      .filter(platform => platform[1])
      .map(platform => platform[0])
  }

  setActiveTable = tableName => {
    return this.setState({ activeTable: tableName, overrideScroll: true })
  }

  stickyTOC = throttle(() => {
    const windowScroll = global.window.scrollY
    if (tocOffset >= windowScroll && this.state.fixedTOC) this.setState({ fixedTOC: false })
    if (tocOffset < windowScroll && !this.state.fixedTOC) this.setState({ fixedTOC: true })
  }, 10)

  tableNames = () => {
    const { tables } = this

    if (!tables()) return false
    return tables().map(table => table.name)
  }

  tables = () => {
    const { schema, selectedPlatforms } = this

    if (!schema()) return false

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
    const { setActiveTable, tableNames } = this
    const entries = tableNames()
    const activeEntry = this.state.activeTable || entries[0]
    const classes = classnames(`${baseClass}__toc-wrapper`, {
      [`${baseClass}__toc-wrapper--fixed`]: this.state.fixedTOC,
    })

    return (
      <div className={classes} id={`${baseClass}-toc`}>
        <h2 className={`${baseClass}__toc-header`}>
          <span className={`${baseClass}__tables-count`}>{entries.length}</span>
          {`Table${entries.length > 1 ? 's' : ''}`}
        </h2>

        <SchemaTOC activeEntry={activeEntry} entries={entries} onEntryClick={setActiveTable} />
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

    if (!schemaVersionExists(match.params.schemaVersion)) return <NotFound />

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
