import React, { Component } from 'react'

class Imac extends Component {
  static defaultProps = {
    fillColor: '#00125F',
    height: 48,
    width: 50,
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
        <title>imac-svg</title>
        <defs>
          <filter
            x="-10.9%"
            y="-18.0%"
            width="121.8%"
            height="148.0%"
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
            transform="translate(-698.000000, -597.000000)"
            fillRule="nonzero"
            fill={fillColor}
          >
            <g id="carousel-w-imac" transform="translate(0.000000, 455.000000)">
              <g id="frame-overlay">
                <g id="Group-7">
                  <g id="table-examples" transform="translate(-50.000000, 131.000000)">
                    <g
                      id="Group-14"
                      filter="url(#filter-1)"
                      transform="translate(750.000000, 7.000000)"
                    >
                      <g id="Group-11" transform="translate(10.000000, 10.000000)">
                        <g id="monitor-(2)" transform="translate(2.000000, 2.000000)">
                          <path
                            d="M20,14 L2,14 L2,2 L20,2 L20,14 Z M20,0 L2,0 C0.89,0 0,0.89 0,2 L0,14 C2.22044605e-16,15.1045695 0.8954305,16 2,16 L9,16 L9,18 L7,18 L7,20 L15,20 L15,18 L13,18 L13,16 L20,16 C21.1045695,16 22,15.1045695 22,14 L22,2 C22,0.89 21.1,0 20,0 Z"
                            id="imac-svg"
                          />
                        </g>
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

export default Imac
