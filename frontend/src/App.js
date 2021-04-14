import React from "react";
import socketIOClient from "socket.io-client";

class App extends React.Component {
  socket;
  ENDPOINT = "http://localhost:3000";
  constructor(props) {
    super(props);
    this.state = { value: '', messages: [] };
    this.messages = [];
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  componentDidMount() {
    this.socket = socketIOClient(this.ENDPOINT);
    this.socket.on("message", data => {
      console.log(`Got a message ${data}`)
      this.setState(prevState => ({
        messages: [...prevState.messages, data]
      }))
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.socket.emit('message', this.state.value)
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <p>Messages</p>
        <ol>
          {(this.state.messages || []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
        <form onSubmit={this.handleSubmit}>
          <label>Message: </label>
          <input type="text" value={this.state.value} onChange={this.handleChange}></input>
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default App;