import React, { Component } from 'react'

import content from 'data/pages/home'
import H1SuperHeading from 'components/text/H1SuperHeading'
import Heading1 from 'components/text/Heading1'
import Icon from 'components/Icon'
import './Home.css'

const baseClass = 'home'

class Home extends Component {
  render() {
    const { hero } = content.sections

    return (
      <div>
        <H1SuperHeading>{hero.sectionSuperHeading}</H1SuperHeading>

        <Heading1>{hero.sectionHeading}</Heading1>

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
