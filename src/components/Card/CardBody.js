import React from 'react'
import classnames from 'classnames'
import { node, string } from 'prop-types'

import './CardBody.css'

const CardBody = ({ children, className }) => {
  const cardBodyClassName = classnames('card-body', className)

  return <div className={cardBodyClassName}>{children}</div>
}

CardBody.propTypes = {
  children: node,
  className: string,
}

export default CardBody
