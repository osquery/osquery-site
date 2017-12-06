import React from 'react'
import { func, string } from 'prop-types'

import Dropdown from 'components/forms/fields/Dropdown'
import osqueryVersionData from 'data/osquery_versions.json'

const dropdownOptions = osqueryVersionData.map(osqueryVersion => {
  const label = osqueryVersion.isCurrent ? (
    <span>
      <strong>{osqueryVersion.version}</strong>
      <small>(current)</small>
    </span>
  ) : (
    <strong>{osqueryVersion.version}</strong>
  )

  return {
    value: osqueryVersion.version,
    label,
  }
})

const OsqueryVersionDropdown = ({ className, name, onChange, value }) => {
  return (
    <Dropdown
      className={className}
      name={name}
      options={dropdownOptions}
      onChange={onChange}
      value={value}
    />
  )
}

OsqueryVersionDropdown.propTypes = {
  className: string,
  name: string.isRequired,
  onChange: func.isRequired,
  value: string.isRequired,
}

export default OsqueryVersionDropdown
