import React from 'react'
import { func, string } from 'prop-types'

import Dropdown from 'components/forms/fields/Dropdown'
import osqueryVersionData from 'data/osquery_metadata'

const { all_versions: allVersions, current_version: currentVersion } = osqueryVersionData

const dropdownOptions = allVersions.map(osqueryVersion => {
  const label =
    osqueryVersion === currentVersion ? (
      <span>
        <strong>{osqueryVersion}</strong>
        <small>(current)</small>
      </span>
    ) : (
      <strong>{osqueryVersion}</strong>
    )

  return {
    value: osqueryVersion,
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
