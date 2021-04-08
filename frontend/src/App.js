import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  getMessages() {
    // Use basic web request for now to test CORS and credentials
    axios.get('http://localhost:3000/channel/1', {withCredentials: true}).then(res => {
      console.log(res.data);
    })
  }
  render () {
    return <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:3000/auth/google"
        >
          Login
        </a>
        <button onClick={this.getMessages}>
          Get Messages
        </button>
        <button>
          Make Message
        </button>
      </header>
    </div>
  }
}

export default App;
