import React, { Component } from 'react'

class DownCarat extends Component {
  static defaultProps = {
    fillColor: '#ffffff',
    height: 6,
    width: 10,
  }

  render() {
    const { className, fillColor, height, width } = this.props

    return (
      <svg
        className={className}
        width={`${width}px`}
        height={`${height}px`}
        viewBox={`0 0 ${width} ${height}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>down-carat-svg</title>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            id="osqueryio-downloads-active-dropdown"
            transform="translate(-902.000000, -638.000000)"
            fillRule="nonzero"
            fill={fillColor}
          >
            <g id="osquery-version" transform="translate(670.000000, 556.000000)">
              <g id="dropdown-button" transform="translate(0.000000, 60.000000)">
                <path
                  d="M240.292893,27.7071068 C240.683418,28.0976311 241.316582,28.0976311 241.707107,27.7071068 C242.097631,27.3165825 242.097631,26.6834175 241.707107,26.2928932 L237.707107,22.2928932 C237.316582,21.9023689 236.683418,21.9023689 236.292893,22.2928932 L232.292893,26.2928932 C231.902369,26.6834175 231.902369,27.3165825 232.292893,27.7071068 C232.683418,28.0976311 233.316582,28.0976311 233.707107,27.7071068 L237,24.4142136 L240.292893,27.7071068 Z"
                  id="down-carat-svg"
                  transform="translate(237.000000, 25.000000) rotate(-180.000000) translate(-237.000000, -25.000000) "
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

export default DownCarat
