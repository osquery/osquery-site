import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';

import Button from '../src/components/Button'
import GithubCard from '../src/components/GithubCard'
import H1SuperHeading from '../src/components/text/H1SuperHeading'
import Heading1 from '../src/components/text/Heading1'
import Heading2 from '../src/components/text/Heading2'
import Heading3 from '../src/components/text/Heading3'
import Heading4 from '../src/components/text/Heading4'
import Heading5 from '../src/components/text/Heading5'
import Icon from '../src/components/Icon'
import Monospace from '../src/components/text/Monospace'
import Paragraph from '../src/components/text/Paragraph'
import Pill from '../src/components/Pill'
import Tab from '../src/components/Tab'

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
  .add('star', () => (
    <Icon name="star" />
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

storiesOf('Tab', module)
  .add('small inactive', () => <Tab onClick={() => false} text="Small Tab" />)
  .add('small active', () => <Tab active onClick={() => false} text="Small Tab" />)
  .add('large inactive', () => <Tab onClick={() => false} size="large" text="Large Tab" />)
  .add('large active', () => <Tab active onClick={() => false} size="large" text="Large Tab" />)

storiesOf('Text', module)
  .add('H1SuperHeading', () => <H1SuperHeading>h1 superheading</H1SuperHeading>)
  .add('Heading1', () => <Heading1>Heading 1</Heading1>)
  .add('Heading2', () => <Heading2>Heading 2</Heading2>)
  .add('Heading3', () => <Heading3>Heading 3</Heading3>)
  .add('Heading4', () => <Heading4>Heading 4</Heading4>)
  .add('Heading5', () => <Heading5>Heading 5</Heading5>)
  .add('Paragraph', () => (
    <div>
      <Paragraph>This is a multi-line paragraph. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Paragraph>
      <Paragraph>This is a one line paragraph.</Paragraph>
    </div>
  ))
  .add('Monospace', () => <Monospace>brew install npm install yarn</Monospace>)

storiesOf('Button', module)
  .add('Button', () => (
    <div style={{ width: '260px' }}>
      <Button onClick={action('button-click')}>Yolo</Button>
    </div>
  ))

storiesOf('Card', module)
  .add('GithubCard', () => (
    <div style={{ width: '270px' }}>
      <GithubCard
        description="A flexible control server for osquery fleets."
        name="kolide/fleet"
        starCount={153}
        url="https://github.com/kolide/fleet"
      />
    </div>
  ))
