import React from "react";
import socketIOClient from "socket.io-client";
import Message from './Message';
import InputArea from './InputArea';
import './Channel.css';
import { toast } from 'react-toastify'
import { Link } from "react-router-dom";

class Channel extends React.Component {

  socket;
  ENDPOINT = "http://localhost:3000";
  scrollToBottom() {
    this.messagesEnd?.scrollIntoView({ behavior: "smooth" });
  };
  constructor(props) {
    super(props);
    this.state = {  messages: [], channel: this.props.match.params.id };
    this.messages = [];
  };

  componentDidMount() {
    this.socket = socketIOClient(this.ENDPOINT)
    this.socket.emit('channeljoin', this.state.channel)
    this.socket.on("message", data => {
      if(data.channel === this.state.channel) {
        console.log(`Got a message ${data.content}`)
        this.setState(prevState => ({
          messages: [...prevState.messages, data]
        }))
        this.scrollToBottom()
      }

    });
    this.socket.on('channeljoin', data => {
      this.setState({
        messages: data.messages
      })
      this.scrollToBottom()
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
        user: localStorage.getItem('name'),
        channel: this.state.channel
      })
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div class="header">
          <Link to={`/`} class="header-text">Octochat </Link>
        </div>
        <div class="channel-container">
          <div id="channels" onClick={async () => { setTimeout(()=>{this.setState({channel: this.props.match.params.id }); this.socket.emit('channeljoin',this.state.channel)},10)}}>
            <Link to={'/channel/general'} class="channel-links" >General Chat</Link>
            <Link to={'/channel/testing'} class="channel-links">Testing</Link>
          </div>
          <div class="messages">
              {(this.state.messages || []).map((item, index) => (
                <Message key={index} message={item}></Message>
              ))}
              <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}>
             </div>
          </div>
          
        </div>
        <InputArea handleSubmit={this.handleSubmit.bind(this)}></InputArea>
      </div>
    );
  }
}

export default Channel;