import React, { Component } from 'react'
import moment from 'moment'

import Button from 'components/Button'
import EventListing from 'components/EventListing'
import eventNames from 'data/community_events/manifest'
import './EventList.css'

const communityEvents = eventNames.map(eventName => {
  const name = eventName.split('.')[0]
  return require(`data/community_events/${name}.json`)
})

const baseClass = 'event-list'

class EventList extends Component {
  state = {
    showPastEvents: false,
  }

  startDate = event => {
    return moment(`${event.startYear}-${event.startMonth}-${event.startDay}`, 'YYYY-M-D')
  }

  endDate = event => {
    const { endDay, endMonth, endYear } = event

    if (endYear && endMonth && endDay) {
      return moment(`${endYear}-${endMonth}-${endDay}`, 'YYYY-M-D')
    } else {
      return null
    }
  }

  shouldDisplay = event => {
    const { showPastEvents } = this.state
    const endDate = this.endDate(event)
    const startDate = this.startDate(event)

    if (showPastEvents) {
      return true
    } else if (endDate) {
      return endDate >= moment()
    } else {
      return startDate >= moment()
    }
  }

  togglePastEvents = () => {
    const { showPastEvents } = this.state
    this.setState({ showPastEvents: !showPastEvents })
  }

  render() {
    const { showPastEvents } = this.state

    return (
      <div>
        <div className={baseClass}>
          {communityEvents
            .sort((b, a) => {
              return this.startDate(a) - this.startDate(b)
            })
            .map((event, index) => {
              if (this.shouldDisplay(event)) {
                return (
                  <EventListing
                    endDate={this.endDate(event)}
                    key={index}
                    location={event.location}
                    startDate={this.startDate(event)}
                    title={event.title}
                    url={event.url}
                  />
                )
              } else {
                return false
              }
            })}
        </div>

        <Button className={`${baseClass}__toggle-events-button`} onClick={this.togglePastEvents}>
          {showPastEvents ? 'Hide Past Community Events' : 'Show Past Community Events'}
        </Button>
      </div>
    )
  }
}

export default EventList
