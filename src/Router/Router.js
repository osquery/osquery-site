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
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/blog/official-news`}
              render={props => <BlogIndex {...props} blogType="official-news" />}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/blog/community-articles`}
              render={props => <BlogIndex {...props} blogType="community-articles" />}
            />

            <Redirect
              exact
              from={`${process.env.PUBLIC_URL}/blog`}
              to={`${process.env.PUBLIC_URL}/blog/official-news`}
            />

            <Route path={`${process.env.PUBLIC_URL}/blog/:blog_title`} component={BlogShow} />

            <Redirect
              exact
              from={`${process.env.PUBLIC_URL}/news`}
              to={`${process.env.PUBLIC_URL}/blog/official-news`}
            />

            <Redirect
              exact
              from={`${process.env.PUBLIC_URL}/community`}
              to={`${process.env.PUBLIC_URL}/blog/community-articles`}
            />

            <Redirect exact from={`${process.env.PUBLIC_URL}/docs/tables`} to="/schema" />

            <Route
              path={`${process.env.PUBLIC_URL}/downloads/:release_type/:osquery_version`}
              component={Downloads}
            />

            <Redirect
              from={`${process.env.PUBLIC_URL}/downloads`}
              to={`${process.env.PUBLIC_URL}/downloads/official/${currentOsqueryVersion}`}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/schema/:schemaVersion`}
              component={Schema}
            />

            <Redirect
              from={`${process.env.PUBLIC_URL}/schema`}
              to={`${process.env.PUBLIC_URL}/schema/${currentOsqueryVersion}`}
            />

            <Route component={NotFound} />
          </Switch>
        </App>
      </BrowserRouter>
    )
  }
}

export default Router
