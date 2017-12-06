import React, { Component } from 'react'
import { func } from 'prop-types'

import Checkbox from 'components/forms/fields/Checkbox'
import Icon from 'components/Icon'
import platformsInterface from 'interfaces/platforms_interface'
import './PlatformForm.css'

const baseClass = 'platform-form'
const darkBlue = '#00125f'
const lightGray = 'rgba(0, 18, 95, .4)'

class PlatformForm extends Component {
  static propTypes = {
    onChange: func.isRequired,
    platforms: platformsInterface,
  }

  state = {
    darwin: true,
    freebsd: true,
    linux: true,
    windows: true,
  }

  componentDidMount() {
    const { platforms } = this.props

    if (platforms) this.setState(platforms)
  }

  onChange = os => {
    return () => {
      const { onChange } = this.props
      let newState = this.state

      if (os === 'all') {
        const nextValue = !this.allChecked()

        newState = {
          darwin: nextValue,
          freebsd: nextValue,
          linux: nextValue,
          windows: nextValue,
        }
      } else {
        newState[os] = !newState[os]
      }

      this.setState(newState, () => onChange(newState))
    }
  }

  allChecked = () => {
    const { darwin, freebsd, linux, windows } = this.state

    return !!(darwin && freebsd && linux && windows)
  }

  anyChecked = () => {
    const { darwin, freebsd, linux, windows } = this.state

    return !!(darwin || freebsd || linux || windows)
  }

  render() {
    const { allChecked, anyChecked, onChange } = this

    return (
      <form>
        <div className={`${baseClass}__input-wrapper ${baseClass}__input-wrapper--distinct`}>
          <Checkbox
            checked={anyChecked()}
            className={`${baseClass}__input`}
            name="all"
            semi={!allChecked() && anyChecked()}
            onChange={onChange('all')}
          >
            Compatible with All Platforms
          </Checkbox>
        </div>

        <div className={`${baseClass}__input-wrapper`}>
          <Checkbox
            checked={this.state.darwin}
            className={`${baseClass}__input`}
            name="darwin"
            onChange={onChange('darwin')}
          >
            MacOS
          </Checkbox>

          <Icon fillColor={this.state.darwin ? darkBlue : lightGray} name="darwin" />
        </div>

        <div className={`${baseClass}__input-wrapper`}>
          <Checkbox
            checked={this.state.freebsd}
            className={`${baseClass}__input`}
            name="free-bsd"
            onChange={onChange('freebsd')}
          >
            FreeBSD
          </Checkbox>

          <Icon fillColor={this.state.freebsd ? darkBlue : lightGray} name="freebsd" />
        </div>

        <div className={`${baseClass}__input-wrapper`}>
          <Checkbox
            checked={this.state.linux}
            className={`${baseClass}__input`}
            name="linux"
            onChange={onChange('linux')}
          >
            Linux
          </Checkbox>

          <Icon fillColor={this.state.linux ? darkBlue : lightGray} name="linux" />
        </div>

        <div className={`${baseClass}__input-wrapper`}>
          <Checkbox
            checked={this.state.windows}
            className={`${baseClass}__input`}
            name="windows"
            onChange={onChange('windows')}
          >
            Windows
          </Checkbox>

          <Icon fillColor={this.state.windows ? darkBlue : lightGray} name="windows" />
        </div>
      </form>
    )
  }
}

export default PlatformForm
