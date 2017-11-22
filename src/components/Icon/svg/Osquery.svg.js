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

        <g fill="none" fillRule="evenodd">
          <path fill="#A596FF" d="M0 2l10.5 9H21L10.5 2z" />
          <path fill="#00125F" d="M10.5 10L0 19h10.5L21 10z" />
          <path fill="#A596FF" d="M39 0l-9 10.474V21l9-10.526z" />
          <path fill="#00125F" d="M21 0v10.474L30 21V10.474z" />
          <path fill="#A596FF" d="M2 29.526V40l9-10.474V19z" />
          <path fill="#00125F" d="M10 29.526L19 40V29.526L10 19z" />
          <path fill="#A596FF" d="M19 30l10.5 9H40l-10.5-9z" />
          <path fill="#00125F" d="M29.5 21L19 30h10.5L40 21z" />
        </g>
      </svg>
    )
  }
}

export default Osquery
