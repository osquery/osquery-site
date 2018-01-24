import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import App from 'components/App'
import BlogIndex from 'pages/BlogIndex'
import BlogShow from 'pages/BlogShow'
import Downloads from 'pages/Downloads'
import Home from 'pages/Home'
import NotFound from 'pages/NotFound'
import osqueryVersionsData from 'data/osquery_metadata'
import Schema from 'pages/Schema'

const currentOsqueryVersion = osqueryVersionsData.current_version

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route
              exact
              path="/blog/official-news"
              render={props => <BlogIndex {...props} blogType="official-news" />}
            />

            <Route
              exact
              path="/blog/community-articles"
              render={props => <BlogIndex {...props} blogType="community-articles" />}
            />

            <Redirect exact from="/blog" to="/blog/official-news" />

            <Route path="/blog/:blog_title" component={BlogShow} />

            <Route path="/downloads/:release_type/:osquery_version" component={Downloads} />

            <Redirect from="/downloads" to={`/downloads/official/${currentOsqueryVersion}`} />

            <Route exact path="/schema/:schemaVersion" component={Schema} />

            <Redirect from="/schema" to={`/schema/${currentOsqueryVersion}`} />

            <Route component={NotFound} />
          </Switch>
        </App>
      </BrowserRouter>
    )
  }
}

export default Router
