import React, { Component } from 'react';

import Main from '../components/Main';
import Team from '../components/Team';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
        <Team />
      </div>
    );
  }
}

export default App;
