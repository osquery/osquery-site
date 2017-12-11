import React, { Component } from 'react'

class ShellHistory extends Component {
  static defaultProps = {
    fillColor: '#00125F',
    height: 32,
    width: 40,
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
        <title>shell-history-svg</title>
        <defs>
          <filter
            x="-9.2%"
            y="-19.1%"
            width="118.5%"
            height="151.1%"
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
            transform="translate(-196.000000, -601.000000)"
            fill={fillColor}
          >
            <g id="carousel-w-imac" transform="translate(0.000000, 455.000000)">
              <g id="frame-overlay">
                <g id="Group-7">
                  <g id="table-examples" transform="translate(-50.000000, 131.000000)">
                    <g
                      id="Group-15"
                      filter="url(#filter-1)"
                      transform="translate(249.000000, 10.000000)"
                    >
                      <g id="Group-9" transform="translate(11.000000, 10.000000)">
                        <path
                          d="M3,3 L15,3 C16.6568542,3 18,4.34314575 18,6 L18,18 C18,19.6568542 16.6568542,21 15,21 L3,21 C1.34314575,21 -6.85272294e-16,19.6568542 -8.8817842e-16,18 L0,6 L0,6 C-2.02906125e-16,4.34314575 1.34314575,3 3,3 L3,3 Z M8,16 L8,18 L15,18 L15,16 L8,16 Z M2,6 L2,8 L6,10 L2,12 L2,14 L8,11 L8,9 L2,6 Z"
                          id="shell-history-svg"
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

export default ShellHistory
