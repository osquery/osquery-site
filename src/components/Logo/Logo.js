import React, { Component } from 'react'
import classNames from 'classnames'
import { string } from 'prop-types'

import Icon from 'components/Icon'
import './Logo.css'

const baseClass = 'logo'

class Logo extends Component {
  static propTypes = {
    className: string,
  }

  render() {
    const { className } = this.props

    return (
      <div className={classNames(baseClass, className)}>
        <Icon className={`${baseClass}__icon`} name="osquery" />

        <span className={`${baseClass}__text`}>osquery</span>
      </div>
    )
  }
}

export default Logo
