import React from 'react'
import classnames from 'classnames'
import { func, string } from 'prop-types'

import './HamburgerMenu.css'

const baseClass = 'hamburger-menu'

const HamburgerMenu = ({ className, onClick }) => {
  const menuClasses = classnames(baseClass, className)

  return (
    <button className={menuClasses} onClick={onClick}>
      <span className={`${baseClass}__bar`} />
      <span className={`${baseClass}__bar`} />
      <span className={`${baseClass}__bar`} />
    </button>
  )
}

HamburgerMenu.propTypes = {
  className: string,
  onClick: func.isRequired,
}

export default HamburgerMenu
