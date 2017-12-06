import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './App.css'
import Footer from 'components/Footer'
import Logo from 'components/Logo'
import ResponsiveNav from 'components/navs/ResponsiveNav'

const baseClass = 'app'

class App extends Component {
  render() {
    const { children } = this.props

    return (
      <div className={baseClass}>
        <header className={`${baseClass}__header`}>
          <Link className={`${baseClass}__home-link`} to="/">
            <Logo className={`${baseClass}__logo`} />
          </Link>

          <ResponsiveNav className={`${baseClass}__nav`} />
        </header>

        {children}

        <Footer />
      </div>
    )
  }
}

export default App
