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

const HEADER_HEIGHT = 80
const baseClass = 'schema'
const currentOsqueryVersion = osqueryVersionsData.current_version

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
    this.filterTables()

    window.addEventListener('scroll', this.scrollActiveTable)
    window.addEventListener('scroll', this.stickyTOC)

    if (this.props.location.hash) {
      setTimeout(() => this.setActiveTable(this.props.location.hash.replace('#', '')), 100)
    }
  }

  componentDidUpdate(prevProps) {
    const schemaVersion = this.getNormalizedSchemaVersion(this.props.match.params.schemaVersion)
    const oldSchemaVersion = this.getNormalizedSchemaVersion(prevProps.match.params.schemaVersion)

    if (oldSchemaVersion !== schemaVersion) {
      this.filterTables()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollActiveTable)
    window.removeEventListener('scroll', this.stickyTOC)
  }

  get headerIsVisible() {
    return global.window.scrollY < HEADER_HEIGHT
  }

  get humanFriendlyPlatforms() {
    if (this.selectedPlatforms().length === Object.entries(this.state.platforms).length)
      return 'All platforms'

    return this.selectedPlatforms()
      .join(', ')
      .replace('darwin', 'macOS')
      .replace('freebsd', 'FreeBSD')
      .replace('linux', 'Linux')
      .replace('windows', 'Windows')
  }

  get pluralizedTables() {
    const { tables } = this.state

    if (tables.length === 1) {
      return 'Table'
    } else {
      return 'Tables'
    }
  }

  getNormalizedSchemaVersion = schemaVersion => {
    return schemaVersion === 'current' ? currentOsqueryVersion : schemaVersion
  }

  getSchema = schemaVersion => {
    if (!schemaVersion) {
      return null
    } else {
      return require(`data/osquery_schema_versions/${schemaVersion}`)
    }
  }

  onPlatformChange = platforms => {
    this.setState({ platforms }, () => {
      this.filterTables()
    })
  }

  onSchemaChange = ({ value }) => {
    return this.props.history.push(`${process.env.PUBLIC_URL}/schema/${value}`)
  }

  priorSchemaVersion = () => {
    const schemaVersion = this.getNormalizedSchemaVersion(this.props.match.params.schemaVersion)
    const priorSchemaIndex = indexOf(osqueryVersionsData.all_versions, schemaVersion) - 1

    if (priorSchemaIndex === -1) {
      return undefined
    } else {
      return osqueryVersionsData.all_versions[priorSchemaIndex]
    }
  }

  restoreDefaultView = () => {
    this.setState(Schema.initialState, () => {
      this.props.history.push(`${process.env.PUBLIC_URL}/schema/${currentOsqueryVersion}`)
      this.filterTables()
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
    const schemaVersion = this.getNormalizedSchemaVersion(this.props.match.params.schemaVersion)

    if (!schemaVersionExists(schemaVersion)) return false

    const selectedSchema = this.getSchema(schemaVersion)
    const priorSchema = this.getSchema(this.priorSchemaVersion())

    return this.decoratedSchema(selectedSchema, priorSchema)
  }

  get tablePositions() {
    return this.state.tables.map(table => {
      const name = table.name
      const domTable = document.getElementById(name)

      return {
        id: name,
        offset: domTable.offsetTop + 40,
      }
    })
  }

  scrollActiveTable = throttle(() => {
    const activeTable =
      this.tablePositions.find(table => {
        return table.offset > global.window.scrollY
      }) || this.tablePositions[this.tablePositions.length - 1].name

    if (!this.state.overrideScroll) {
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
    return Object.entries(this.state.platforms)
      .filter(platform => platform[1])
      .map(platform => platform[0])
  }

  setActiveTable = tableName => {
    return this.setState({ activeTable: tableName, overrideScroll: true })
  }

  stickyTOC = throttle(() => {
    if (this.headerIsVisible && this.state.fixedTOC) {
      this.setState({ fixedTOC: false })
    } else if (!this.headerIsVisible && !this.state.fixedTOC) {
      this.setState({ fixedTOC: true })
    }
  }, 10)

  filterTables = () => {
    if (!this.schema()) return false

    const tables = this.schema().filter(table => {
      return this.selectedPlatforms().every(selectedPlatform => {
        return table.platforms.includes(selectedPlatform)
      })
    })

    this.setState({ tables })
  }

  renderTables = () => {
    return this.state.tables.map(table => {
      return <OsqueryTable className={`${baseClass}__table`} key={table.name} tableData={table} />
    })
  }

  renderTOC = () => {
    if (!this.state.tables.length) return null

    const activeEntry = this.state.activeTable || this.state.tables[0].name
    const classes = classnames(`${baseClass}__toc-wrapper`, {
      [`${baseClass}__toc-wrapper--fixed`]: this.state.fixedTOC,
    })

    return (
      <div className={classes}>
        <h2 className={`${baseClass}__toc-header`}>
          <span className={`${baseClass}__tables-count`}>{this.state.tables.length}</span>
          {this.pluralizedTables}
        </h2>

        <SchemaTOC
          activeEntry={activeEntry}
          onEntryClick={this.setActiveTable}
          tables={this.state.tables}
        />
      </div>
    )
  }

  render() {
    const schemaVersion = this.getNormalizedSchemaVersion(this.props.match.params.schemaVersion)

    if (!schemaVersionExists(schemaVersion)) return <NotFound />

    return (
      <div className={baseClass}>
        {this.renderTOC()}

        <div className={`${baseClass}__main`}>
          <div className={`${baseClass}__tables-wrapper`}>
            <div className={`${baseClass}__refinements`}>
              <div className={`${baseClass}__schema-selector`}>
                <LabelText>Osquery Version:</LabelText>

                <OsqueryVersionDropdown
                  className={`${baseClass}__schema-dropdown`}
                  name="schema-version"
                  onChange={this.onSchemaChange}
                  value={schemaVersion}
                />
              </div>
            </div>

            <div className={`${baseClass}__filters`}>
              <div className={`${baseClass}__platform-filter`}>
                <LabelText>Show only Tables compatible with:</LabelText>

                <PlatformDropdown
                  className={`${baseClass}__platform-dropdown`}
                  onChange={this.onPlatformChange}
                  platforms={this.state.platforms}
                >
                  {this.humanFriendlyPlatforms}
                </PlatformDropdown>
              </div>

              <Button
                className={`${baseClass}__restore-default-button`}
                onClick={this.restoreDefaultView}
                variant="link"
              >
                Restore Default View
              </Button>
            </div>

            {this.renderTables()}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Schema)
