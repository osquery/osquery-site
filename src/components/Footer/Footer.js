import React from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import Heading5 from 'components/text/Heading5'
import Icon from 'components/Icon'
import './Footer.css'

const baseClass = 'footer'
const mobileWidth = 800

const Meta = () => {
  return (
    <section className={`${baseClass}__meta`}>
      <div className={`${baseClass}__facebook-open-source`}>
        <Icon name="facebookOpenSource" />

        <span>Facebook Open Source</span>
      </div>

      <p className={`${baseClass}__copyright`}>&copy; 2017 Project License</p>

      <p className={`${baseClass}__made-by-kolide`}>
        Site made with
        <span className={`${baseClass}__heart-text`}> &#10084; </span>
        by Kolide in memory of Parse
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
            <a href="https://github.com/facebook/osquery">View the code on Github</a>
          </li>
        </ul>
      </section>

      <section className={`${baseClass}__resource-links`}>
        <Heading5>Resources</Heading5>

        <ul>
          <li className={`${baseClass}__li`}>
            <Link to="/blog">Blog</Link>
          </li>

          <li className={`${baseClass}__li`}>
            <Link to="/schema">Schema</Link>
          </li>

          <li className={`${baseClass}__li`}>
            <a href="https://osquery.readthedocs.io/en/stable/">Docs</a>
          </li>

          <li className={`${baseClass}__li`}>
            <Link to="/downloads">Downloads</Link>
          </li>
        </ul>
      </section>

      <MediaQuery maxWidth={mobileWidth}>{<Meta />}</MediaQuery>
    </footer>
  )
}

export default Footer
