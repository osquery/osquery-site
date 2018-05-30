import React, { Component } from 'react'

const Calendars = ({ className, fill, fillRule, height, width }) => {
  return (
    <svg className={className} height={height} width={width} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 17V8H7v9h14zm0-14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1V1h2v2h8V1h2v2h1zM3 21h14v2H3a2 2 0 0 1-2-2V9h2v12zm16-6h-4v-4h4v4z"
        fillRule={fillRule}
        fill={fill}
      />
    </svg>
  )
}

Calendars.defaultProps = {
  fill: '#4A9DFF',
  fillRule: 'nonzero',
  height: '24',
  width: '24',
}

export default Calendars
