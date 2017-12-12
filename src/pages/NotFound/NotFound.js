import React from 'react'
import { Link } from 'react-router-dom'

import IosTerminal from 'components/terminals/IosTerminal'
import Heading1 from 'components/text/Heading1'
import Icon from 'components/Icon'
import Monospace from 'components/text/Monospace'
import './NotFound.css'

const baseClass = 'not-found'

const NotFound = () => {
  return (
    <div className={baseClass}>
      <Heading1 className={`${baseClass}__heading-1`}>This looks like a problem...</Heading1>

      <IosTerminal className={`${baseClass}__ios-terminal`}>
        <Monospace>osquery> SELECT display_message FROM errors where code = '404';</Monospace>
        <br />

        <Monospace className={`${baseClass}__monospace-dark`}>
          &nbsp;_____&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;_____&nbsp;&nbsp;&nbsp;&nbsp;___
        </Monospace>
        <Monospace className={`${baseClass}__monospace-dark`}>
          |&nbsp;&nbsp;___|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;_&nbsp;&nbsp;|&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;|
        </Monospace>
        <Monospace className={`${baseClass}__monospace-dark`}>
          |&nbsp;|__&nbsp;_&nbsp;__&nbsp;_&nbsp;__&nbsp;___&nbsp;&nbsp;_&nbsp;__&nbsp;&nbsp;&nbsp;/&nbsp;/|&nbsp;|&nbsp;|/'&nbsp;|&nbsp;/&nbsp;/|&nbsp;|
        </Monospace>
        <Monospace className={`${baseClass}__monospace-dark`}>
          |&nbsp;&nbsp;__|&nbsp;'__|&nbsp;'__/&nbsp;_&nbsp;\|&nbsp;'__|&nbsp;/&nbsp;/_|&nbsp;|&nbsp;&nbsp;/|&nbsp;|/&nbsp;/_|&nbsp;|
        </Monospace>
        <Monospace className={`${baseClass}__monospace-dark`}>
          |&nbsp;|__|&nbsp;|&nbsp;&nbsp;|&nbsp;|&nbsp;|&nbsp;(_)&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;\___&nbsp;&nbsp;\&nbsp;|_/&nbsp;/\___&nbsp;&nbsp;|
        </Monospace>
        <Monospace className={`${baseClass}__monospace-dark`}>
          \____/_|&nbsp;&nbsp;|_|&nbsp;&nbsp;\___/|_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_/\___/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_/
        </Monospace>
        <Monospace className={`${baseClass}__monospace-dark`}>
          ______&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;______&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_
        </Monospace>
        <Monospace className={`${baseClass}__monospace-dark`}>
          |&nbsp;___&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;___|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|
        </Monospace>
        <Monospace className={`${baseClass}__monospace-dark`}>
          |&nbsp;|_/&nbsp;/_&nbsp;_&nbsp;&nbsp;__&nbsp;_&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;_&nbsp;__&nbsp;&nbsp;&nbsp;___&nbsp;|&nbsp;|_&nbsp;&nbsp;|&nbsp;|_&nbsp;___&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;_&nbsp;__&nbsp;&nbsp;&nbsp;__|&nbsp;|
        </Monospace>
        <Monospace className={`${baseClass}__monospace-dark`}>
          |&nbsp;&nbsp;__/&nbsp;_`&nbsp;|/&nbsp;_`&nbsp;|/&nbsp;_&nbsp;\&nbsp;|&nbsp;'_&nbsp;\&nbsp;/&nbsp;_&nbsp;\|&nbsp;__|&nbsp;|&nbsp;&nbsp;_/&nbsp;_&nbsp;\|&nbsp;|&nbsp;|&nbsp;|&nbsp;'_&nbsp;\&nbsp;/&nbsp;_`&nbsp;|
        </Monospace>
        <Monospace className={`${baseClass}__monospace-dark`}>
          |&nbsp;|&nbsp;|&nbsp;(_|&nbsp;|&nbsp;(_|&nbsp;|&nbsp;&nbsp;__/&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;(_)&nbsp;|&nbsp;|_&nbsp;&nbsp;|&nbsp;||&nbsp;(_)&nbsp;|&nbsp;|_|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;(_|&nbsp;|
        </Monospace>
        <Monospace className={`${baseClass}__monospace-dark`}>
          \_|&nbsp;&nbsp;\__,_|\__,&nbsp;|\___|&nbsp;|_|&nbsp;|_|\___/&nbsp;\__|&nbsp;\_|&nbsp;\___/&nbsp;\__,_|_|&nbsp;|_|\__,_|
        </Monospace>
        <Monospace className={`${baseClass}__monospace-dark`}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__/&nbsp;|
        </Monospace>
        <Monospace className={`${baseClass}__monospace-dark`}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___/
        </Monospace>

        <br />
        <Monospace>osquery> .exit</Monospace>
        <Monospace>$ cd osquery.io</Monospace>
      </IosTerminal>

      <Link className={`${baseClass}__take-me-back`} to="/">
        <Icon name="backArrow" />

        <span>Take me back to osquery.io</span>
      </Link>
    </div>
  )
}

export default NotFound
