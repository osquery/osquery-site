import React, { Component } from 'react'

class MacFinder extends Component {
  static defaultProps = {
    fillColor: '#00125F',
    height: 32,
    width: 48,
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
        <title>mac-finder-svg</title>
        <defs>
          <filter
            x="-13.3%"
            y="-15.8%"
            width="126.7%"
            height="142.1%"
            filterUnits="objectBoundingBox"
            id="filter-1"
          >
            <feOffset dx="0" dy="6" in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur stdDeviation="7" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
            <feColorMatrix
              values="0 0 0 0 0.125490196   0 0 0 0 0.145098039   0 0 0 0 0.196078431  0 0 0 0.16 0"
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
            transform="translate(-490.000000, -589.000000)"
            fillRule="nonzero"
            fill={fillColor}
          >
            <g id="carousel-w-imac" transform="translate(0.000000, 455.000000)">
              <g id="frame-overlay">
                <g id="Group-7">
                  <g id="table-examples" transform="translate(-50.000000, 131.000000)">
                    <g
                      id="Group-25"
                      filter="url(#filter-1)"
                      transform="translate(541.000000, 0.000000)"
                    >
                      <g id="Group-9" transform="translate(12.000000, 9.000000)">
                        <path
                          d="M3,3 L10.89,3 C11.46,1.91 12.13,0.88 12.93,0 L14.04,1.11 C13.61,1.7 13.23,2.34 12.89,3 L19,3 C20.1045695,3 21,3.8954305 21,5 L21,18 C21,19.1045695 20.1045695,20 19,20 L13.93,20 L14.26,21.23 L12.43,21.95 L11.93,20 L3,20 C1.8954305,20 1,19.1045695 1,18 L1,5 C1,3.8954305 1.8954305,3 3,3 L3,3 Z M3,5 L3,18 L11.54,18 C11.5,17.67 11.44,17.34 11.4,17 C11.27,17 11.13,17 11,17 C8.25,17 5.78,16.5 4.13,15.76 L5.04,14.12 C6,14.64 8.17,15 11,15 C11.08,15 11.16,15 11.24,15 C11.21,14.33 11.22,13.66 11.27,13 L8,13 C8,13 8.4,8.97 10,5 L3,5 L3,5 Z M19,18 L19,5 L12,5 C11.1,7.22 10.58,9.46 10.3,11 L13.17,11 C13,12.28 12.97,13.62 13.06,14.93 C14.87,14.8 16.25,14.5 16.96,14.12 L17.87,15.76 C16.69,16.3 15.1,16.7 13.29,16.89 C13.35,17.27 13.41,17.64 13.5,18 L19,18 L19,18 Z M5,7 L7,7 L7,10 L5,10 L5,7 L5,7 Z M15,7 L17,7 L17,10 L15,10 L15,7 Z"
                          id="mac-finder-svg"
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

export default MacFinder
