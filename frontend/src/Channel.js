import React from "react";
import socketIOClient from "socket.io-client";
import Message from './Message';
import InputArea from './InputArea';
import './Channel.css';
class Channel extends React.Component {
  socket;
  ENDPOINT = "http://localhost:3000";
  constructor(props) {
    super(props);
    this.state = {  messages: [] };
    this.messages = [];

  };
  componentDidMount() {
    this.socket = socketIOClient(this.ENDPOINT)
    this.socket.emit('channeljoin', 1)
    this.socket.on("message", data => {
      console.log(`Got a message ${data.content}`)
      this.setState(prevState => ({
        messages: [...prevState.messages, data]
      }))
    });
    this.socket.on('channeljoin', data => {
      this.setState({
        messages: data.messages
      })
    })
  }



  handleSubmit(event,_message) {
    if(_message.length > 0){
      this.socket.emit('message', {
        message: _message
      })
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div class="header">
          Octochat
        </div>
        <div class="messages">
          <div>
            {(this.state.messages || []).map((item, index) => (
              <Message key={index} message={item}></Message>
            ))}
          </div>
        </div>
        <InputArea handleSubmit={this.handleSubmit.bind(this)}></InputArea>
      </div>
    );
  }
}

export default Channel;