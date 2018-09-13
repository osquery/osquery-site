import React from 'react'
import MediaQuery from 'react-responsive'
import { object, string } from 'prop-types'

import './EventListing.css'

const mobileWidth = 800
const baseClass = 'event-listing'

const EventListing = props => {
  const { endDate, location, startDate, title, url } = props

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__dates`}>
        <span className={`${baseClass}__date`}>
          <MediaQuery minWidth={mobileWidth + 1}>{startDate.format('MMM D')}</MediaQuery>

          <MediaQuery maxWidth={mobileWidth}>{startDate.format('M/D/YY')}</MediaQuery>
        </span>

        {endDate && (
          <span className={`${baseClass}__date`}>
            <MediaQuery minWidth={mobileWidth + 1}> - {endDate.format('MMM D')}</MediaQuery>

            <MediaQuery maxWidth={mobileWidth}> - {endDate.format('M/D/YY')}</MediaQuery>
          </span>
        )}

        <span className={`${baseClass}__date`}>
          <MediaQuery minWidth={mobileWidth + 1}>
            , {endDate ? endDate.format('YYYY') : startDate.format('YYYY')}
          </MediaQuery>
        </span>
      </div>

      <a className={`${baseClass}__title`} href={url} target="_blank">
        {title}
      </a>

      <div className={`${baseClass}__location`}>{location}</div>
    </div>
  )
}

EventListing.propTypes = {
  endDate: object,
  location: string.isRequired,
  startDate: object.isRequired,
  title: string.isRequired,
  url: string,
}

export default EventListing
