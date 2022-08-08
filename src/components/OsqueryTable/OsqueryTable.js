import React from 'react'
import classnames from 'classnames'
import { string, object } from 'prop-types'

import Card from 'components/Card'
import Heading5 from 'components/text/Heading5'
import Icon from 'components/Icon'
import './OsqueryTable.css'

const baseClass = 'osquery-table'
const allPlatforms = ['darwin', 'windows', 'linux']

const PlatformIcons = ({ platforms }) => {
  if (platforms.length === 1 && platforms[0] === 'all') {
    return allPlatforms.map((platformName, idx) => {
      if (platformName == 'freebsd') return
      return <Icon className={`${baseClass}__icon`} key={`platform-${idx}`} name={platformName} />
    })
  }

  return platforms.map((platformName, idx) => {
    return <Icon className={`${baseClass}__icon`} key={`platform-${idx}`} name={platformName} />
  })
}

class OsqueryTable extends React.PureComponent {
  render() {
    const { className, tableData } = this.props

    return (
      <Card.Wrapper className={classnames(baseClass, className)} id={tableData.name}>
        <Card.Header className={`${baseClass}__header`}>
          <div className={`${baseClass}__header--left`}>
            <Heading5 className={`${baseClass}__table-name`}>
              {tableData.name}

              {tableData.new && (
                <span>
                  <span>{` `}</span>
                  <span className={`${baseClass}__new-indicator`}>new</span>
                </span>
              )}

              {tableData.evented && (
                <span>
                  <Icon className={`${baseClass}__evented-icon`} name="calendars" />

                  <span className={`${baseClass}__evented`}>(EVENTED TABLE)</span>
                </span>
              )}
            </Heading5>

            <p className={`${baseClass}__table-description`}>{tableData.description}</p>

            <a className={`${baseClass}__table-url`} href={tableData.url}>
              Improve this Description on Github
            </a>
          </div>

          <div className={`${baseClass}__header--right`}>
            <PlatformIcons platforms={tableData.platforms} />
          </div>
        </Card.Header>

        <table>
          <thead>
            <tr>
              <td>COLUMN</td>
              <td>TYPE</td>
              <td>DESCRIPTION</td>
            </tr>
          </thead>
          <tbody>
            {tableData.columns.map((column, idx) => {
              return (
                <tr key={`column-${idx}`}>
                  <td className={`${baseClass}__table-data`}>{column.name}</td>
                  <td className={`${baseClass}__table-data ${baseClass}__type`}>{column.type}</td>
                  <td className={`${baseClass}__table-data ${baseClass}__description`}>
                    <span>{column.description}</span>

                    {column.required && (
                      <span>
                        <Icon name="pushPin" />
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card.Wrapper>
    )
  }
}

OsqueryTable.propTypes = {
  className: string,
  tableData: object,
}

export default OsqueryTable
