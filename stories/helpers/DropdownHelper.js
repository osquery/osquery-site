import React, { Component } from 'react'

const DropdownHOC = (DropdownComponent) => {
  class DropdownHelper extends Component {
    state = {
      value: '',
    }

    onChange = (option) => {
      this.setState({ value: option.value }, () => this.props.onChange(option.value))
    }

    render () {
      return (
        <DropdownComponent
          {...this.props}
          name="dropdown"
          onChange={this.onChange}
          value={this.state.value}
        />
      )
    }
  }

  return DropdownHelper
}

export default DropdownHOC
