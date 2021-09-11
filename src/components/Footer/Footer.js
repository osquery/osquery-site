import React from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import Heading5 from 'components/text/Heading5'
import Icon from 'components/Icon'
import scrollTop from 'helpers/scroll_top'
import './Footer.css'

const baseClass = 'footer'
const mobileWidth = 800

const sponsors = [
  ['1Password', 'https://1password.com/'],
  ['Amazon Web Services (AWS)', 'https://aws.amazon.com/'],
  ['Facebook', 'https://www.facebook.com/'],
  ['GitHub', 'https://www.github.com/'],
  ['Kolide', 'https://www.kolide.com/'],
  ['Trail of Bits', 'https://www.trailofbits.com/'],
]

const renderSponsor = (name, url) => {
  return (
    <a href={url} rel="noopener noreferrer" target="_blank">
      {name}
    </a>
  )
}

const renderSponsors = () => {
  return [
    intersperse(sponsors.map(s => renderSponsor(s[0], s[1])), ', '),
    ', and ',
    renderSponsor('You?', 'https://crowdfunding.lfx.linuxfoundation.org/projects/osquery'),
  ]
}

function intersperse(arr, sep) {
  if (arr.length === 0) {
    return []
  }

  return arr.slice(1).reduce(
    function(xs, x, i) {
      return xs.concat([sep, x])
    },
    [arr[0]]
  )
}

const Meta = () => {
  return (
    <section className={`${baseClass}__meta`}>
      <a
        className={`${baseClass}__facebook-open-source`}
        href="https://www.linuxfoundation.org/projects/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icon name="linuxFoundationLogo" />
      </a>

      <a
        className={`${baseClass}__copyright`}
        href="https://github.com/osquery/osquery/blob/master/LICENSE"
        rel="noopener noreferrer"
        target="_blank"
      >
        &copy; 2019 Project License
      </a>

      <p className={`${baseClass}__made-by-kolide`}>
        <span className={`${baseClass}__heart-text`}> &#10084; </span>
        <span>to our sponsors: </span>
        {renderSponsors()}
      </p>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className={baseClass}>
      <MediaQuery minWidth={mobileWidth + 1}>{<Meta />}</MediaQuery>

      <section className={`${baseClass}__open-source-links`}>
        <Heading5>Open Source</Heading5>

        <ul>
          <li className={`${baseClass}__li`}>
            <a href="https://github.com/osquery/osquery">View the code on GitHub</a>
          </li>
        </ul>
      </section>

      <section className={`${baseClass}__resource-links`}>
        <Heading5>Resources</Heading5>

        <ul>
          <li className={`${baseClass}__li`}>
            <Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}/blog`}>
              Blog
            </Link>
          </li>

          <li className={`${baseClass}__li`}>
            <Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}/schema`}>
              Schema
            </Link>
          </li>

          <li className={`${baseClass}__li`}>
            <a href="https://osquery.readthedocs.io/en/stable/">Docs</a>
          </li>

          <li className={`${baseClass}__li`}>
            <Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}/downloads`}>
              Downloads
            </Link>
          </li>
        </ul>
      </section>

      <MediaQuery maxWidth={mobileWidth}>{<Meta />}</MediaQuery>
    </footer>
  )
}

export default Footer
