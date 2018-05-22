import React, { Component } from 'react'
import classnames from 'classnames'
import includes from 'lodash.includes'
import indexOf from 'lodash.indexof'
import { func, shape, string } from 'prop-types'
import { withRouter } from 'react-router'

import Button from 'components/Button'
import LabelText from 'components/text/LabelText'
import NotFound from 'pages/NotFound'
import OsqueryTable from 'components/OsqueryTable'
import OsqueryVersionDropdown from 'components/forms/fields/OsqueryVersionDropdown'
import osqueryVersionsData from 'data/osquery_metadata'
import PlatformDropdown from 'components/forms/fields/PlatformDropdown'
import SchemaTOC from 'components/SchemaTOC'
import schemaVersionExists from 'helpers/schema_version_exists'
import throttle from 'helpers/throttle'
import './Schema.css'

const baseClass = 'schema'
const currentOsqueryVersion = osqueryVersionsData.current_version
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
    overrideScroll: false,
    platforms: {
      darwin: false,
      freebsd: false,
      linux: false,
      windows: false,
    },
    tables: [],
  }

  state = Schema.initialState

  componentDidMount() {
    const { filterTables, scrollActiveTable, setActiveTable, stickyTOC } = this
    const { hash } = this.props.location

    filterTables()

    if (hash) {
      setTimeout(() => setActiveTable(hash.replace('#', '')), 100)
    }

    const tocElement = document.getElementById(`${baseClass}-toc`)
    tocOffset = tocElement ? tocElement.offsetTop : 0

    window.addEventListener('scroll', scrollActiveTable)
    window.addEventListener('scroll', stickyTOC)
  }

  componentDidUpdate(prevProps) {
    const { filterTables } = this
    const { schemaVersion } = this.props.match.params
    const oldSchemaVersion = prevProps.match.params.schemaVersion

    if (oldSchemaVersion !== schemaVersion) {
      filterTables()
    }
  }

  componentWillUnmount() {
    const { scrollActiveTable, stickyTOC } = this

    window.removeEventListener('scroll', scrollActiveTable)
    window.removeEventListener('scroll', stickyTOC)
  }

  getSchema = schemaVersion => {
    if (!schemaVersion) {
      return null
    } else {
      return require(`data/osquery_schema_versions/${schemaVersion}`)
    }
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

  onPlatformChange = platforms => {
    const { filterTables } = this

    this.setState({ platforms }, () => {
      filterTables()
    })
  }

  onSchemaChange = ({ value }) => {
    const { push } = this.props.history

    return push(`/schema/${value}`)
  }

  priorSchemaVersion = () => {
    const { schemaVersion } = this.props.match.params
    const priorSchemaIndex = indexOf(osqueryVersionsData.all_versions, schemaVersion) - 1
    if (priorSchemaIndex === -1) {
      return undefined
    } else {
      return osqueryVersionsData.all_versions[priorSchemaIndex]
    }
  }

  restoreDefaultView = () => {
    const { filterTables } = this
    const { push } = this.props.history

    this.setState(Schema.initialState, () => {
      push(`/schema/${currentOsqueryVersion}`)
      filterTables()
    })
  }

  decoratedSchema = (selectedSchema, priorSchema) => {
    if (!priorSchema) return selectedSchema

    const priorTableNames = priorSchema.map(table => table.name)

    return selectedSchema.map(table => {
      table.new = !includes(priorTableNames, table.name)
      return table
    })
  }

  schema = () => {
    const { schemaVersion } = this.props.match.params

    if (!schemaVersionExists(schemaVersion)) return false

    const selectedSchema = this.getSchema(schemaVersion)
    const priorSchema = this.getSchema(this.priorSchemaVersion())

    return this.decoratedSchema(selectedSchema, priorSchema)
  }

  get tablePositions() {
    const { tables } = this.state
    return tables.map(table => {
      const name = table.name
      const domTable = document.getElementById(name)

      return {
        id: name,
        offset: domTable.offsetTop + 40,
      }
    })
  }

  scrollActiveTable = throttle(() => {
    const { tablePositions } = this
    const { overrideScroll } = this.state
    const windowScroll = global.window.scrollY

    const activeTable =
      tablePositions.find(table => {
        return table.offset > windowScroll
      }) || tablePositions[tablePositions.length - 1].name

    if (!overrideScroll) {
      if (activeTable) {
        this.setState({ activeTable: activeTable.id, overrideScroll: false })

        const tocEntry = document.getElementById(`toc-entry-${activeTable.id}`)
        const schemaToc = document.getElementById('schema-toc__list')

        schemaToc.scrollTop = tocEntry.offsetHeight * tocEntry.dataset.index
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

  filterTables = () => {
    const { schema, selectedPlatforms } = this

    if (!schema()) return false

    const tables = schema().filter(table => {
      return selectedPlatforms().every(selectedPlatform => {
        return table.platforms.includes(selectedPlatform)
      })
    })

    this.setState({ tables })
  }

  renderTables = () => {
    const { tables } = this.state

    return tables.map(table => {
      return <OsqueryTable className={`${baseClass}__table`} key={table.name} tableData={table} />
    })
  }

  renderTOC = () => {
    const { activeTable, fixedTOC, tables } = this.state

    if (!tables.length) return null

    const activeEntry = activeTable || tables[0].name
    const classes = classnames(`${baseClass}__toc-wrapper`, {
      [`${baseClass}__toc-wrapper--fixed`]: fixedTOC,
    })

    return (
      <div className={classes} id={`${baseClass}-toc`}>
        <h2 className={`${baseClass}__toc-header`}>
          <span className={`${baseClass}__tables-count`}>{tables.length}</span>
          {`Table${tables.length > 1 ? 's' : ''}`}
        </h2>

        <SchemaTOC activeEntry={activeEntry} onEntryClick={this.setActiveTable} tables={tables} />
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
