import React, { Component } from 'react'

class Cpu extends Component {
  static defaultProps = {
    fillColor: '#00125F',
    height: 44,
    width: 44,
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
        <title>cpu-svg</title>
        <defs>
          <filter
            x="-12.9%"
            y="-18.2%"
            width="125.8%"
            height="148.5%"
            filterUnits="objectBoundingBox"
            id="filter-1"
          >
            <feOffset dx="0" dy="6" in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur stdDeviation="7" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
            <feColorMatrix
              values="0 0 0 0 0   0 0 0 0 0.0705882353   0 0 0 0 0.37254902  0 0 0 0.16 0"
              type="matrix"
              in="shadowBlurOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            id="osquery-io-again-again"
            transform="translate(-1443.000000, -597.000000)"
            fillRule="nonzero"
            fill={fillColor}
          >
            <g id="carousel-w-imac" transform="translate(0.000000, 455.000000)">
              <g id="frame-overlay">
                <g id="Group-7">
                  <g id="table-examples" transform="translate(-50.000000, 131.000000)">
                    <g
                      id="Group-12"
                      filter="url(#filter-1)"
                      transform="translate(1493.000000, 7.000000)"
                    >
                      <g id="Group-3" transform="translate(13.000000, 8.000000)">
                        <path
                          d="M14,17 L4,17 L4,7 L14,7 L14,17 Z M18,11 L18,9 L16,9 L16,7 C16,5.89 15.1,5 14,5 L12,5 L12,3 L10,3 L10,5 L8,5 L8,3 L6,3 L6,5 L4,5 C2.89,5 2,5.89 2,7 L2,9 L0,9 L0,11 L2,11 L2,13 L0,13 L0,15 L2,15 L2,17 C2,18.1045695 2.8954305,19 4,19 L6,19 L6,21 L8,21 L8,19 L10,19 L10,21 L12,21 L12,19 L14,19 C15.1045695,19 16,18.1045695 16,17 L16,15 L18,15 L18,13 L16,13 L16,11 L18,11 Z M10,13 L8,13 L8,11 L10,11 L10,13 Z M12,9 L6,9 L6,15 L12,15 L12,9 Z"
                          id="cpu-svg"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

export default Cpu
