import React, { Component } from 'react'

class BackArrow extends Component {
  static defaultProps = {
    arrowFillColor: '#4D4E7F',
    arrowOpacity: '0.6',
    circleFillColor: '#E8ECF1',
    height: 66,
    width: 66,
  }

  render() {
    const { arrowFillColor, arrowOpacity, circleFillColor, height, width } = this.props

    return (
      <svg
        width={`${width}px`}
        height={`${height}px`}
        viewBox={`0 0 ${width} ${height}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Group 13</title>

        <g
          id="back-arrow"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          transform="translate(-593.000000, -810.000000)"
        >
          <g id="Group" transform="translate(593.000000, 810.000000)">
            <g id="Group-13">
              <g id="Group-3">
                <circle id="back-arrow-circle" fill={circleFillColor} cx="33" cy="33" r="33" />

                <path
                  d="M21.1407215,30.320896
                  L31.0022749,20.7400157
                  C32.0175496,19.7533281
                  33.6646084,19.7533281
                  34.679883,20.7400157
                  C35.6951576,21.7254034
                  35.6951576,23.3256834
                  34.679883,24.3110711
                  L28.4127397,30.400195
                  L43.400065,30.400195
                  C44.8365291,30.400195
                  46,31.5636805
                  46,33.0001625
                  C46,34.4353446
                  44.8365291,35.60013
                  43.400065,35.60013
                  L28.4127397,35.60013
                  L34.679883,41.6879539
                  C35.6951576,42.6746416
                  35.6951576,44.2723216
                  34.679883,45.2590093
                  C34.1715957,45.7530031
                  33.5060123,46
                  32.840429,46
                  C32.1761456,46
                  31.5105622,45.7530031
                  31.0022749,45.2590093
                  L21.1407215,35.678129
                  C19.6197595,34.2013475
                  19.6197595,31.7976775
                  21.1407215,30.320896
                  Z"
                  id="back-arrow-arrow"
                  fillOpacity={arrowOpacity}
                  fill={arrowFillColor}
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

export default BackArrow
