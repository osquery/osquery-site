import React, { Component } from 'react'

import Dropdown from '../../src/components/forms/fields/Dropdown'

class DropdownHelper extends Component {
  state = {
    value: '',
  }

  onChange = (option) => {
    this.setState({ value: option.value }, () => this.props.onChange(option.value))
  }

  render () {
    return (
      <Dropdown
        name="dropdown"
        options={[
          { value: '2.10.0', label: [<strong>2.10.0</strong>, <small>(current)</small>] },
          { value: '2.9.2', label: <strong>2.9.2</strong> },
          { value: '2.8.3', label: <strong>2.8.3</strong> },
          { value: '2.6.4', label: <strong>2.6.4</strong> },
          { value: '2.1.2', label: <strong>2.1.2</strong> },
        ]}
        onChange={this.onChange}
        value={this.state.value}
      />
    )
  }
}

export default DropdownHelper
