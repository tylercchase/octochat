import React from "react";
import socketIOClient from "socket.io-client";
import Message from './Message';
import InputArea from './InputArea';
import './Channel.css';
import { toast } from 'react-toastify'
import { Link, NavLink } from "react-router-dom";

class Channel extends React.Component {

  socket;
  ENDPOINT = "http://localhost:3000";
  scrollToBottom() {
    this.messagesEnd?.scrollIntoView({ behavior: "smooth" });
  };
  constructor(props) {
    super(props);
    this.state = { messages: [], channel: this.props.match.params.id };
    this.messages = [];
  };

  componentDidMount() {
    this.socket = socketIOClient(this.ENDPOINT)
    this.socket.emit('channeljoin', this.state.channel)
    this.socket.on("message", data => {
      if (data.channel === this.state.channel) {
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



  handleSubmit(event, _message) {
    if (_message.length > 255) {
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
    if (_message.length > 0 && _message.length < 255) {
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
        <div className="header">
          <Link to={`/`} className="header-text">Octochat </Link>
        </div>
        <div className="channel-container">
          <div id="channels" onClick={async () => { setTimeout(() => { this.setState({ channel: this.props.match.params.id }); this.socket.emit('channeljoin', this.state.channel) }, 10) }}>
            <NavLink to={'/channel/general'} className="channel-links"  activeClassName="selected">General Chat</NavLink>
            <NavLink to={'/channel/testing'} className="channel-links"  activeClassName="selected">Testing</NavLink>
            <NavLink to={'/channel/5'} className="channel-links"  activeClassName="selected">5</NavLink>
            <NavLink to={'/channel/CsGetDegrees'} className="channel-links"  activeClassName="selected">C's Get Degrees</NavLink>
            <NavLink to={'/channel/Date Chat♥🍑🍆💦'} className="channel-links"  activeClassName="selected">Date Chat♥🍑🍆💦</NavLink>
            <NavLink to={'/channel/Pancake Recipes'} className="channel-links"  activeClassName="selected">Pancake Recipes</NavLink>
            <NavLink to={'/channel/Conspiracy Theories'} className="channel-links"  activeClassName="selected">Conspiracy Theories</NavLink>
          </div>
          <div className="right-side">
            <div className="messages">
              {(this.state.messages || []).map((item, index) => (
                <Message key={index} message={item}></Message>
              ))}
              <div style={{ float: "left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
              </div>
            </div>
            <InputArea handleSubmit={this.handleSubmit.bind(this)}></InputArea>
          </div>


        </div>
      </div>
    );
  }
}

export default Channel;