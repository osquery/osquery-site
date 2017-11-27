import React from 'react'
import classnames from 'classnames'

import TerminalSnapshot from 'components/terminals/TerminalSnapshot'
import './OsqueryTableSnapshot.css'

const baseClass = 'osquery-table-snapshot'

const OsqueryTableSnapshot = ({ className, data }) => {
  return (
    <TerminalSnapshot.Wrapper className={classnames(baseClass, className)}>
      <TerminalSnapshot.Header iconName={data.iconName}>
        <span>{data.title}</span>
      </TerminalSnapshot.Header>

      <TerminalSnapshot.Body>
        <table>
          <tbody>
            {data.snapshot_rows.map(({ property, value }, idx) => {
              return (
                <tr key={`row-${idx}`}>
                  <td className={`${baseClass}__td ${baseClass}__property`}>{property}</td>

                  <td className={`${baseClass}__pipe`}>|</td>

                  <td className={`${baseClass}__td`}>{value}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </TerminalSnapshot.Body>
    </TerminalSnapshot.Wrapper>
  )
}

export default OsqueryTableSnapshot
