import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { storiesOf } from '@storybook/react'

import Icon from '../src/components/Icon'
import Pill from '../src/components/Pill'

const IconWrapper = (Component) => {
  class IconWrapperComponent extends React.Component {
    static icons = [
      'apple',
      'centos',
      'linux',
      'ubuntu',
      'windows'
    ]

    state = {
      name: 'apple',
    }

    render() {
      return (
        <div>
          <div>
            {IconWrapperComponent.icons.map((platform, idx) => {
              return (
                <button
                  key={idx}
                  onClick={(e) => this.setState({ name: e.target.value })}
                  value={platform}
                >
                  {platform}
                </button>
              )
            })}
          </div>
          <br />
          <Component {...this.props} name={this.state.name} />
        </div>
      )
    }
  }

  return IconWrapperComponent
}

const WrappedIcon = IconWrapper(Icon)

storiesOf('Icon', module)
  .add('cpu', () => (
    <Icon name="cpu" />
  ))
  .add('facebookOpenSource', () => (
    <Icon name="facebookOpenSource" />
  ))
  .add('frameOverlay', () => (
    <Icon name="frameOverlay" />
  ))
  .add('githubMark', () => (
    <Icon name="githubMark" />
  ))
  .add('imac', () => (
    <Icon name="imac" />
  ))
  .add('imacLg', () => (
    <Icon name="imacLg" />
  ))
  .add('macFinder', () => (
    <Icon name="macFinder" />
  ))
  .add('octocat', () => (
    <Icon name="octocat" />
  ))
  .add('platform icons', () => (
    <WrappedIcon />
  ))
  .add('shellHistory', () => (
    <Icon name="shellHistory" />
  ))
  .add('slack', () => (
    <Icon name="slack" />
  ))

storiesOf('Pill', module)
  .add('inactive', () => (
    <BrowserRouter>
      <Pill to="/nowhere">Inactive</Pill>
    </BrowserRouter>
  ))
  .add('active', () => (
    <BrowserRouter>
      <Pill active to="/nowhere">Active</Pill>
    </BrowserRouter>
  ))
