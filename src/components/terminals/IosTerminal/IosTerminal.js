import React from 'react'
import classnames from 'classnames'
import { node, string } from 'prop-types'

import Terminal from 'components/terminals/Terminal'
import './IosTerminal.css'

const baseClass = 'ios-terminal'

const IosTerminal = ({ bodyClassName, children, className }) => {
  const dotClass = `${baseClass}__dot`

  return (
    <Terminal.Wrapper className={className}>
      <Terminal.Header className={`${baseClass}__header`}>
        <div className={`${dotClass} ${dotClass}--error`} />

        <div className={`${dotClass} ${dotClass}--warning`} />

        <div className={`${dotClass} ${dotClass}--success`} />
      </Terminal.Header>

      <Terminal.Body className={classnames(`${baseClass}__body`, bodyClassName)}>
        {children}
      </Terminal.Body>
    </Terminal.Wrapper>
  )
}

IosTerminal.propTypes = {
  bodyClassName: string,
  children: node.isRequired,
  className: string,
}

export default IosTerminal
