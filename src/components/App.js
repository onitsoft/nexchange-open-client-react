import React, { Component } from 'react';

import Main from '../components/Main';
import Team from '../components/Team';
import RecentOrders from '../components/RecentOrders';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
        <RecentOrders />
        <Team />
      </div>
    );
  }
}

export default App;
