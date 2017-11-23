import React from 'react'
import classnames from 'classnames'
import { string } from 'prop-types'

import './CardWrapper.css'

const CardWrapper = ({ children, className }) => {
  const cardWrapperClassName = classnames('card-wrapper', className)

  return (
    <div className={cardWrapperClassName}>
      {children}
    </div>
  )
}

CardWrapper.propTypes = {
  className: string,
}

export default CardWrapper
