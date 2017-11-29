import React from 'react'
import { arrayOf, func, node, oneOfType, shape, string } from 'prop-types'
import Select from 'react-select'

import './Dropdown.css'

const baseClass = 'dropdown'

const Dropdown = ({ name, onChange, options, value }) => {
  return (
    <Select
      className={baseClass}
      clearable={false}
      name={name}
      options={options}
      onChange={onChange}
      value={value}
    />
  )
}

Dropdown.propTypes = {
  name: string.isRequired,
  onChange: func.isRequired,
  options: arrayOf(
    shape({
      label: oneOfType([arrayOf(node), node, string]).isRequired,
      value: string,
    })
  ),
  value: string,
}

export default Dropdown
