import React, { Component } from 'react'

import Checkbox from '../../src/components/forms/fields/Checkbox'

class CheckboxHelper extends Component {
  state = {
    checked: false,
  }

  onChange = (e) => {
    this.setState({ checked: !this.state.checked })
  }

  render () {
    return (
      <div>
        <Checkbox checked={this.state.checked} name="checkbox" onChange={this.onChange}>
          Checkbox
        </Checkbox>
        <br />
        <br />
        <Checkbox disabled name="disabled-checkbox" onChange={this.onChange}>
          Disabled Checkbox
        </Checkbox>
      </div>
    )
  }
}

export default CheckboxHelper
