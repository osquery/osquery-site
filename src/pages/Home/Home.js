import React, { Component } from 'react'

import Icon from 'components/Icon'
import './Home.css'

const baseClass = 'home'

class Home extends Component {
  render() {
    return (
      <div>
        <div className={`${baseClass}__icon-wrapper`}>
          <Icon className={`${baseClass}__platform-icon`} name="apple" />

          <Icon className={`${baseClass}__platform-icon`} name="centos" />

          <Icon className={`${baseClass}__platform-icon`} name="ubuntu" />

          <Icon className={`${baseClass}__platform-icon`} name="windows" />

          <Icon className={`${baseClass}__platform-icon`} name="linux" />
        </div>
      </div>
    )
  }
}

export default Home
