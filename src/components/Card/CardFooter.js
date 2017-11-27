import React from 'react'
import classnames from 'classnames'
import { node, string } from 'prop-types'

import './CardFooter.css'

const CardFooter = ({ children, className }) => {
  const cardFooterClassName = classnames('card-footer', className)

  return <div className={cardFooterClassName}>{children}</div>
}

CardFooter.propTypes = {
  children: node,
  className: string,
}

export default CardFooter
