import React, { Component } from 'react';

import Icon from 'components/Icon';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="home__icon-wrapper">
          <Icon className="home__platform-icon" name="apple" />
          <Icon className="home__platform-icon" name="centos" />
          <Icon className="home__platform-icon" name="ubuntu" />
          <Icon className="home__platform-icon" name="windows" />
          <Icon className="home__platform-icon" name="linux" />
        </div>
        <p className="home__intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Home;
