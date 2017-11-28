import React from 'react'
import { bool, func, node, string } from 'prop-types'
import classnames from 'classnames'

import './Checkbox.css'

const baseClass = 'checkbox'

const Checkbox = ({ checked, children, className, disabled, name, semi, onChange }) => {
  const checkBoxClass = classnames(baseClass, className)
  const checkBoxTickClass = classnames(`${baseClass}__tick`, {
    [`${baseClass}__tick--disabled`]: disabled,
    [`${baseClass}__tick--semi`]: semi,
  })

  return (
    <label htmlFor={name} className={checkBoxClass}>
      <input
        checked={checked}
        className={`${baseClass}__input`}
        disabled={disabled}
        id={name}
        name={name}
        onChange={onChange}
        type="checkbox"
      />
      <span className={checkBoxTickClass} />
      <span className={`${baseClass}__label`}>{children}</span>
    </label>
  )
}

Checkbox.propTypes = {
  checked: bool,
  children: node,
  className: string,
  disabled: bool,
  name: string.isRequired,
  onChange: func.isRequired,
  semi: bool,
}

export default Checkbox
