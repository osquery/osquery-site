import React from 'react'
import classnames from 'classnames'
import { node, string } from 'prop-types'

import './CardHeader.css'

const CardHeader = ({ children, className }) => {
  const cardHeaderClassName = classnames('card-header', className)

  return (
    <div className={cardHeaderClassName}>
      {children}
    </div>
  )
}

CardHeader.propTypes = {
  children: node,
  className: string,
}

export default CardHeader
