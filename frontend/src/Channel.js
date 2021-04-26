import React from "react";
import socketIOClient from "socket.io-client";
import Message from './Message';
import InputArea from './InputArea';
import './Channel.css';
import { ToastContainer, toast } from 'react-toastify'

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
    if(_message.length > 255){
      toast.error('🐙 Message too long.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    if(_message.length > 0 && _message.length < 255){
      this.socket.emit('message', {
        message: _message,
        user: localStorage.getItem('name')
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