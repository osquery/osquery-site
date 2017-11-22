import React, { Component } from 'react'

class ImacLg extends Component {
  static defaultProps = {
    height: 410,
    width: 477,
  }

  render() {
    const { className, height, width } = this.props

    return (
      <svg
        className={className}
        width={`${width}px`}
        height={`${height}px`}
        viewBox={`0 0 ${width} ${height}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>imac</title>
        <defs>
          <ellipse id="path-1" cx="215.5" cy="358" rx="207.5" ry="14" />
          <filter
            x="-13.3%"
            y="-189.3%"
            width="126.5%"
            height="492.9%"
            filterUnits="objectBoundingBox"
            id="filter-2"
          >
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur stdDeviation="18" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
            <feColorMatrix
              values="0 0 0 0 0.062745098   0 0 0 0 0.141176471   0 0 0 0 0.345098039  0 0 0 0.11 0"
              type="matrix"
              in="shadowBlurOuter1"
            />
          </filter>
          <path
            d="M109.154733,34.6997456 C104.017265,28.1520765 104.46193,4.63896602 104.558412,1.59829505 L70.6285302,1 L69.2239873,1 L36.3451073,0.99290274 C36.4415896,4.03357371 39.1263752,27.6154788 33.9897611,34.1631479 L4.7251563,56.0084195 C0.553364984,61.0443888 8.29670831,61.0443888 14.0660071,61.0443888 L69.6628536,61.0443888 L70.1879562,61.0443888 L125.784803,61.0443888 C131.556663,61.0443888 139.299152,61.0443888 135.127361,56.0084195 L109.154733,34.6997456 Z"
            id="path-3"
          />
          <filter
            x="-10.9%"
            y="-15.8%"
            width="121.8%"
            height="148.3%"
            filterUnits="objectBoundingBox"
            id="filter-4"
          >
            <feMorphology
              radius="2"
              operator="dilate"
              in="SourceAlpha"
              result="shadowSpreadOuter1"
            />
            <feOffset dx="0" dy="5" in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
            <feColorMatrix
              values="0 0 0 0 0.125490196   0 0 0 0 0.145098039   0 0 0 0 0.196078431  0 0 0 0.24 0"
              type="matrix"
              in="shadowBlurOuter1"
            />
          </filter>
          <linearGradient
            x1="0.000193050193%"
            y1="49.9956848%"
            x2="100.000129%"
            y2="49.9956848%"
            id="linearGradient-5"
          >
            <stop stopColor="#6B6B6B" offset="0%" />
            <stop stopColor="#7C7C7C" offset="5.36%" />
            <stop stopColor="#909090" offset="14.39%" />
            <stop stopColor="#9F9F9F" offset="24.48%" />
            <stop stopColor="#A8A8A8" offset="36.38%" />
            <stop stopColor="#ABABAB" offset="54.6%" />
            <stop stopColor="#A7A7A7" offset="66.81%" />
            <stop stopColor="#9C9C9C" offset="77.7%" />
            <stop stopColor="#8A8A8A" offset="88.08%" />
            <stop stopColor="#717171" offset="98.1%" />
            <stop stopColor="#6B6B6B" offset="100%" />
          </linearGradient>
          <path
            d="M138.380188,55.0084195 L116.23139,32.6819861 C110.837618,26.134317 111.559238,3.04067097 111.660533,0 L70.6635642,0 L69.1889498,0 L28.1919807,0 C28.2932764,3.04067097 29.0139997,26.134317 23.6211243,32.6819861 L1.47232656,55.0084195 C-2.90759191,60.0443888 5.22206029,60.0443888 11.2791845,60.0443888 L69.6497108,60.0443888 L70.2010104,60.0443888 L128.571537,60.0443888 C134.63135,60.0443888 142.760106,60.0443888 138.380188,55.0084195 L138.380188,55.0084195 Z"
            id="path-6"
          />
          <linearGradient x1="50%" y1="-218.083905%" x2="50%" y2="100%" id="linearGradient-8">
            <stop stopColor="#202532" offset="0%" />
            <stop stopColor="#202532" stopOpacity="0" offset="100%" />
          </linearGradient>
          <radialGradient
            cx="50.0000815%"
            cy="49.9997663%"
            fx="50.0000815%"
            fy="49.9997663%"
            r="43.4659411%"
            gradientTransform="translate(0.500001,0.499998),scale(0.688788,1.000000),translate(-0.500001,-0.499998)"
            id="radialGradient-9"
          >
            <stop stopColor="#FFFFFF" offset="0%" />
            <stop stopColor="#A8A8A8" offset="100%" />
          </radialGradient>
          <path
            d="M429.651457,282.309826 C429.651457,289.703833 423.927514,295.69878 416.868564,295.69878 L13.1314363,295.69878 C6.07146255,295.69878 0.34854303,289.702808 0.34854303,282.309826 L0.34854303,13.3899787 C0.34854303,5.99392188 6.07146255,0 13.1314363,0 L416.868564,0 C423.928537,0 429.651457,5.99494683 429.651457,13.3899787 L429.651457,282.309826 L429.651457,282.309826 Z"
            id="path-10"
          />
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="osquery-io-again-again" transform="translate(-562.000000, -514.000000)">
            <g id="carousel-w-imac" transform="translate(0.000000, 455.000000)">
              <g id="imac" transform="translate(585.000000, 59.000000)">
                <g id="shadow" fillOpacity="1" fill="black">
                  <use filter="url(#filter-2)" xlinkHref="#path-1" />
                </g>
                <g id="imac-stand" transform="translate(145.088062, 293.161351)">
                  <g id="Shape">
                    <use
                      fill="black"
                      fillOpacity="1"
                      filter="url(#filter-4)"
                      xlinkHref="#path-3"
                    />
                    <use fill="#C4CBD5" fillRule="evenodd" xlinkHref="#path-3" />
                  </g>
                  <path
                    d="M0.200303578,59.6216828 C0.777599423,66.974252 5.26060644,65.647329 10.5333613,65.647329 L69.1916391,65.647329 L70.5129653,65.647329 L129.171243,65.647329 C134.444894,65.647329 138.928798,66.974252 139.504301,59.6216828 L0.200303578,59.6216828 L0.200303578,59.6216828 Z"
                    id="Shape"
                    fill="url(#linearGradient-5)"
                  />
                  <path
                    d="M0.200303578,59.6216828 C0.777599423,66.974252 5.26060644,65.647329 10.5333613,65.647329 L69.1916391,65.647329 L70.5129653,65.647329 L129.171243,65.647329 C134.444894,65.647329 138.928798,66.974252 139.504301,59.6216828 L0.200303578,59.6216828 L0.200303578,59.6216828 Z"
                    id="Shape"
                    fillOpacity="0.1"
                    fill="#16203A"
                  />
                  <g id="Group-27" transform="translate(0.000000, 1.000000)">
                    <mask id="mask-7" fill="white">
                      <use xlinkHref="#path-6" />
                    </mask>
                    <use id="Shape" fill="#C4CBD5" xlinkHref="#path-6" />
                    <rect
                      id="Rectangle-4"
                      fillOpacity="0.300000012"
                      fill="url(#linearGradient-8)"
                      mask="url(#mask-7)"
                      x="19.8679073"
                      y="-0.161350898"
                      width="100.088062"
                      height="21.1613509"
                    />
                  </g>
                </g>
                <g id="imac-body">
                  <use fill="url(#radialGradient-9)" xlinkHref="#path-10" />
                  <use fill="#D9DEE6" xlinkHref="#path-10" />
                </g>
                <path
                  d="M429.651457,256.860509 L429.651457,14.3778088 C429.651457,6.43603389 423.927514,0 416.868564,0 L13.1314363,0 C6.07146255,0 0.34854303,6.43709577 0.34854303,14.3778088 L0.34854303,256.860509 L429.651457,256.860509 L429.651457,256.860509 Z"
                  id="screen-bezel"
                  fill="#000000"
                />
                <rect
                  id="screen"
                  fill="#4A9DFF"
                  x="18.5956393"
                  y="17.2389603"
                  width="392.46678"
                  height="220.658692"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

export default ImacLg
