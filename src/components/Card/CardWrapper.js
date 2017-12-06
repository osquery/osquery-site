import React from 'react'
import classnames from 'classnames'
import { node, string } from 'prop-types'

import './CardWrapper.css'

const CardWrapper = ({ children, className, id }) => {
  const cardWrapperClassName = classnames('card-wrapper', className)

  return (
    <div className={cardWrapperClassName} id={id}>
      {children}
    </div>
  )
}

CardWrapper.propTypes = {
  children: node,
  className: string,
  id: string,
}

export default CardWrapper
