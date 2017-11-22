import React, { Component } from 'react'

import './App.css'
import GlobalNav from 'components/GlobalNav'
import Logo from 'components/Logo'

const baseClass = 'app'

class App extends Component {
  render() {
    const { children } = this.props

    return (
      <div className={baseClass}>
        <header className={`${baseClass}__header`}>
          <Logo className={`${baseClass}__logo`} />

          <GlobalNav className={`${baseClass}__nav`} />
        </header>

        {children}
      </div>
    )
  }
}

export default App
