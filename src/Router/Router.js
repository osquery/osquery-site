import React, { Component, Suspense } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import App from 'components/App'
import osqueryVersionsData from 'data/osquery_metadata'

const Home = React.lazy(() => import('pages/Home'))
const BlogIndex = React.lazy(() => import('pages/BlogIndex'))
const BlogShow = React.lazy(() => import('pages/BlogShow'))
const Downloads = React.lazy(() => import('pages/Downloads'))
const Schema = React.lazy(() => import('pages/Schema'))
const NotFound = React.lazy(() => import('pages/NotFound'))

const currentOsqueryVersion = osqueryVersionsData.current_version

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Suspense
            fallback={<div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>}
          >
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
              <Route
                from={`${process.env.PUBLIC_URL}/schema/`}
                render={({ location }) => (
                  // This render function is a redirect that preserves the search
                  // and hash params. This allows linking directly to tables
                  // without knowing the version number in advance.
                  <Redirect
                    to={{
                      pathname: `${process.env.PUBLIC_URL}/schema/${currentOsqueryVersion}/`,
                      search: location.search,
                      hash: location.hash,
                    }}
                  />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </App>
      </BrowserRouter>
    )
  }
}

export default Router
