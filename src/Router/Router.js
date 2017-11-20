import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from 'App';
import Home from 'Home';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </App>
      </BrowserRouter>
    );
  }
}

export default Router;
