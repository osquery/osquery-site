import React, { Component } from 'react'
import classnames from 'classnames'
import { node, string } from 'prop-types'

import './TerminalBody.css'

const baseClass = 'terminal-body'

class TerminalBody extends Component {
  static propTypes = {
    children: node.isRequired,
    className: string,
  }

  componentDidMount() {
    document.addEventListener('copy', this.formatCopy)
  }

  componentWillUnmount() {
    document.removeEventListener('copy', this.formatCopy)
  }

  formatCopy = event => {
    const selection = window.getSelection().toString()
    if (event.target.closest(`.${baseClass}`)) {
      const terminalLeader = /(^\$\s*|(?<=\n)\$\s*)/g

      event.clipboardData.setData('text/plain', selection.replace(terminalLeader, ''))
      event.preventDefault()
    }
  }

  render() {
    const { children, className } = this.props
    const classNames = classnames(baseClass, className)

    return <div className={classNames}>{children}</div>
  }
}

export default TerminalBody
