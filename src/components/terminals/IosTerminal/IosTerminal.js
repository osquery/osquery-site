import React, { Component } from 'react'
import { node, string } from 'prop-types'

import Terminal from 'components/terminals/Terminal'
import './IosTerminal.css'

const baseClass = 'ios-terminal'

const IosTerminal = ({ children, className }) => {
  const dotClass = `${baseClass}__dot`

  return (
    <Terminal.Wrapper>
      <Terminal.Header className={`${baseClass}__header`}>
        <div className={`${dotClass} ${dotClass}--error`} />

        <div className={`${dotClass} ${dotClass}--warning`} />

        <div className={`${dotClass} ${dotClass}--success`} />
      </Terminal.Header>

      <Terminal.Body className={`${baseClass}__body`}>{children}</Terminal.Body>
    </Terminal.Wrapper>
  )
}

IosTerminal.propTypes = {
  children: node.isRequired,
  className: string,
}

export default IosTerminal
