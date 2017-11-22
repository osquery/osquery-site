import React, { Component } from 'react'

class FrameOverlay extends Component {
  static defaultProps = {
    fillColor: '#000000',
    height: 257,
    width: 430,
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
        <title>frame-overlay</title>
        <defs>
          <linearGradient
            x1="98.5787205%"
            y1="1.28180642%"
            x2="41.0696025%"
            y2="118.147115%"
            id="linearGradient-1"
          >
            <stop stopColor="#FFFFFF" offset="0%" />
            <stop stopColor="#FFFFFF" stopOpacity="0.9104" offset="8.96%" />
            <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%" />
          </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="osqueryio-home" transform="translate(-585.000000, -514.000000)">
            <g id="carousel-w-imac" transform="translate(0.000000, 455.000000)">
              <g id="frame-overlay" transform="translate(585.000000, 59.000000)">
                <path
                  d="M416.868564,0 L320.693826,0 L194.985138,256.860509 L429.651457,256.860509 L429.651457,14.3778088 C429.651457,6.43709577 423.927514,0 416.868564,0 L416.868564,0 Z"
                  id="screen-reflection"
                  fillOpacity="0.300000012"
                  fill="url(#linearGradient-1)"
                  opacity="0.52"
                />
                <path
                  d="M429.651457,256.860509 L429.651457,256.860509 L0.34854303,256.860509 L0.34854303,14.3778088 C0.34854303,6.43709577 6.07146255,0 13.1314363,0 L416.868564,0 C423.927514,0 429.651457,6.43603389 429.651457,14.3778088 L429.651457,256.860509 Z M18.5956393,17.2389603 L18.5956393,237.897653 L411.062419,237.897653 L411.062419,17.2389603 L18.5956393,17.2389603 Z"
                  id="Combined-Shape"
                  fill={fillColor}
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

export default FrameOverlay
