import React from 'react'
import { arrayOf, func, node, oneOfType, shape, string } from 'prop-types'
import classnames from 'classnames'
import Select from 'react-select'

import './Dropdown.css'

const baseClass = 'dropdown'

const Dropdown = ({ className, name, onChange, options, value }) => {
  const selectClassName = classnames(baseClass, className)

  return (
    <Select
      className={selectClassName}
      clearable={false}
      name={name}
      options={options}
      onChange={onChange}
      value={value}
    />
  )
}

Dropdown.propTypes = {
  className: string,
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
