import React, { Component } from 'react'

class Osquery extends Component {
  static defaultProps = {
    height: 40,
    width: 40,
  }

  render() {
    const { className, height, width } = this.props

    return (
      <svg
        className={className}
        height={`${height}px`}
        version="1.1"
        viewBox={`0 0 ${width} ${height}`}
        width={`${width}px`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>osquery</title>

        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g>
            <polygon fill="#A596FF" points="0 0 10 10 20 10 10 0"></polygon>
            <polygon fill="#00125F" points="10 10 0 20 10 20 20 10"></polygon>
            <polygon fill="#A596FF" points="40 0 40 10 30 20 30 10"></polygon>
            <polygon fill="#00125F" points="30 10 30 20 20 10 20 0"></polygon>
            <polygon fill="#A596FF" points="40 40 30 40 20 30 30 30"></polygon>
            <polygon fill="#00125F" points="30 30 20 30 30 20 40 20"></polygon>
            <polygon fill="#A596FF" points="0 40 0 30 10 20 10 30"></polygon>
            <polygon fill="#00125F" points="10 30 10 20 20 30 20 40"></polygon>
          </g>
        </g>
      </svg>
    )
  }
}

export default Osquery
