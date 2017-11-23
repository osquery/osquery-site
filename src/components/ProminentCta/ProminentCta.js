import React from 'react'
import classnames from 'classnames'
import { node, string } from 'prop-types'

import './ProminentCta.css'

const baseClass = 'prominent-cta'

const ProminentCta = ({ children, className, icon }) => {
  const wrapperClassname = classnames(baseClass, className)

  return (
    <div className={wrapperClassname}>
      <div className={`${baseClass}__circle`}>
        {icon}
      </div>
      {children}
    </div>
  )
}

ProminentCta.propTypes = {
  children: node,
  className: string,
  icon: node.isRequired,
}

export default ProminentCta;
