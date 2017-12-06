import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import App from 'components/App'
import Downloads from 'pages/Downloads'
import Home from 'pages/Home'
import osqueryVersionsData from 'data/osquery_versions.json'
import Schema from 'pages/Schema'

const currentOsqueryVersion = osqueryVersionsData.find(osqueryVersion => osqueryVersion.isCurrent)

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/downloads/:osquery_version" component={Downloads} />
            <Redirect from="/downloads" to={`/downloads/${currentOsqueryVersion.version}`} />

            <Route exact path="/schema/:schemaVersion" component={Schema} />
            <Redirect from="/schema" to={`/schema/${currentOsqueryVersion.version}`} />
          </Switch>
        </App>
      </BrowserRouter>
    )
  }
}

export default Router
