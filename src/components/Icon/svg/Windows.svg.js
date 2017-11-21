import React, { Component } from 'react'

class Windows extends Component {
  static defaultProps = {
    fillColor: '#00125F',
    height: 20,
    width: 20,
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
        <title>windows</title>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            id="osquery-io-again-again"
            transform="translate(-828.000000, -370.000000)"
            fill={fillColor}
          >
            <g id="h1-page-title" transform="translate(474.000000, 253.000000)">
              <g id="compatible-platforms" transform="translate(238.000000, 115.000000)">
                <path
                  d="M116.210526,12.6315789 L123.789474,12.6315789 L123.789474,19.9578947 L116.210526,18.9473684 L116.210526,12.6315789 Z M125.052632,20.1260211 L125.052632,12.6317053 L135.160421,12.6317053 L135.160421,21.4738105 L125.052632,20.1260211 Z M123.789474,4.04235789 L123.789474,11.3686737 L116.210526,11.3686737 L116.210526,5.05288421 L123.789474,4.04235789 Z M135.160421,11.3684211 L125.052632,11.3684211 L125.052632,3.87410526 L135.160421,2.52631579 L135.160421,11.3684211 Z"
                  id="windows"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

export default Windows
