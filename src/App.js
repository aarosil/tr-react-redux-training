import React, { Component } from 'react';
import UserSearch from './components/UserSearch';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Welcome to React/Redux training</h2>
        </div>
        <UserSearch />
      </div>
    );
  }
}

export default App;
