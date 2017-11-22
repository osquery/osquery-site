import React from 'react'
import classnames from 'classnames'
import { func, node, string } from 'prop-types'

import './Button.css'

const Button = ({ children, className, onClick }) => {
  const buttonClassName = classnames('button', className)

  return <button className={buttonClassName} onClick={onClick}>{children}</button>
}

Button.propTypes = {
  children: node,
  className: string,
  onClick: func.isRequired,
}

export default Button
