import React, { Component } from 'react'
import { func, node, string } from 'prop-types'
import classnames from 'classnames'

import ClickOutside from 'components/ClickOutside'
import Icon from 'components/Icon'
import PlatformForm from 'components/forms/PlatformForm'
import platformsInterface from 'interfaces/platforms_interface'
import './PlatformDropdown.css'

const baseClass = 'platform-dropdown'

class PlatformDropdown extends Component {
  static propTypes = {
    children: node,
    className: string,
    onChange: func,
    platforms: platformsInterface,
  }

  state = {
    isOpen: false,
  }

  setDOMNode = DOMNode => {
    this.DOMNode = DOMNode
  }

  toggleIsOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  renderForm = () => {
    const { isOpen } = this.state
    const { onChange, platforms } = this.props

    if (!isOpen) return false

    return (
      <div className={`${baseClass}__form`}>
        <PlatformForm onChange={onChange} platforms={platforms} />
      </div>
    )
  }

  render() {
    const { children, className } = this.props
    const { renderForm, setDOMNode, toggleIsOpen } = this
    const wrapperClassName = classnames(baseClass, className)

    return (
      <div className={wrapperClassName} ref={setDOMNode}>
        <button className={`${baseClass}__text`} onClick={toggleIsOpen}>
          <span>
            {children}

            <span className={`${baseClass}__circle`}>
              <Icon name="downCarat" />
            </span>
          </span>
        </button>

        {renderForm()}
      </div>
    )
  }
}

export default ClickOutside(PlatformDropdown, {
  getDOMNode: component => {
    return component.DOMNode
  },
  onOutsideClick: component => {
    return () => {
      component.setState({ isOpen: false })
    }
  },
})
