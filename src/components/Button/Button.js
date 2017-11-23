import React from 'react'
import classnames from 'classnames'
import { func, node, string } from 'prop-types'

import './Button.css'

const Button = ({ children, className, href, onClick }) => {
  const buttonClassName = classnames('button', className)

  if (!!href) {
    return <a className={buttonClassName} href={href}>{children}</a>
  }

  return <button className={buttonClassName} onClick={onClick}>{children}</button>
}

Button.propTypes = {
  children: node,
  className: string,
  href: string,
  onClick: func,
}

export default Button
