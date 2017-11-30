import React, { Component } from 'react'
import { func } from 'prop-types'

import Checkbox from 'components/forms/fields/Checkbox'
import Icon from 'components/Icon'
import './PlatformForm.css'

const baseClass = 'platform-form'
const darkBlue = '#00125f'
const lightGray = 'rgba(0, 18, 95, .4)'

class PlatformForm extends Component {
  static propTypes = {
    onChange: func.isRequired,
  }

  state = {
    centos: true,
    darwin: true,
    freebsd: true,
    ubuntu: true,
    windows: true,
  }

  onChange = os => {
    return () => {
      const { onChange } = this.props
      let newState = this.state

      if (os === 'all') {
        const nextValue = !this.allChecked()

        newState = {
          centos: nextValue,
          darwin: nextValue,
          freebsd: nextValue,
          ubuntu: nextValue,
          windows: nextValue,
        }
      } else {
        newState[os] = !newState[os]
      }

      this.setState(newState, () => onChange(newState))
    }
  }

  allChecked = () => {
    const { centos, darwin, freebsd, ubuntu, windows } = this.state

    return !!(centos && darwin && freebsd && ubuntu && windows)
  }

  anyChecked = () => {
    const { centos, darwin, freebsd, ubuntu, windows } = this.state

    return !!(centos || darwin || freebsd || ubuntu || windows)
  }

  render() {
    const { allChecked, anyChecked, onChange } = this

    return (
      <form>
        <div className={`${baseClass}__input-wrapper`}>
          <Checkbox
            checked={anyChecked()}
            className={`${baseClass}__input`}
            name="all"
            semi={!allChecked() && anyChecked()}
            onChange={onChange('all')}
          >
            Select All
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
            checked={this.state.ubuntu}
            className={`${baseClass}__input`}
            name="ubuntu"
            onChange={onChange('ubuntu')}
          >
            Ubuntu
          </Checkbox>

          <Icon fillColor={this.state.ubuntu ? darkBlue : lightGray} name="ubuntu" />
        </div>

        <div className={`${baseClass}__input-wrapper`}>
          <Checkbox
            checked={this.state.centos}
            className={`${baseClass}__input`}
            name="centos"
            onChange={onChange('centos')}
          >
            centOS
          </Checkbox>

          <Icon fillColor={this.state.centos ? darkBlue : lightGray} name="centos" />
        </div>

        <div className={`${baseClass}__input-wrapper`}>
          <Checkbox
            checked={this.state.freebsd}
            className={`${baseClass}__input`}
            name="free-bsd"
            onChange={onChange('freebsd')}
          >
            Free BSD
          </Checkbox>

          <Icon fillColor={this.state.freebsd ? darkBlue : lightGray} name="freebsd" />
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
