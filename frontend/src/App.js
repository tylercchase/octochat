import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("connection", data => {
      // setResponse(data);
      console.log('connected')
    });
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;


// import logo from './logo.svg';
// import './App.css';
// import React, {useState, useEffect} from 'react';
// import { socketIOClient } from "socket.io-client";
// import axios from 'axios';

// function App{
//   const [response, setResponse] = useState("");

//   getMessages() {
//     // Use basic web request for now to test CORS and credentials
//     axios.get('http://localhost:3000/channel/1', {withCredentials: true}).then(res => {
//       console.log(res.data);
//     })
//   }
//   sendMessage() {
    
//   }
//   useEffect(()=> {
//     const socket = socketIOClient('http://localhost:3000')
//     socket.on('connect', data => {
//       console.log('connected')
//     });
//   }, [] );

//   return () {
//     return <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="http://localhost:3000/auth/google"
//         >
//           Login
//         </a>
//         <button onClick={this.getMessages}>
//           Get Messages
//         </button>
//         <button>
//           Make Message
//         </button>
//       </header>
//     </div>
//   }
// }

// export default App;
