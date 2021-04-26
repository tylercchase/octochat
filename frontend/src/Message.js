import React from "react";
import './Message.css'
class Message extends React.Component {
    render() {
        return (
            <div class="message">
                <div>
                    <img src="https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png" class="profile-img"/>
                </div>
                <div class="message-content">
                    <div class="user-details">
                        <div class="username">{this.props.message.user}</div>
                        <div class="time">{this.props.message.sent.substring(0,10)}</div>
                    </div>
                    <div class="content">{this.props.message.content}</div>
                </div>

            </div>
        )
    }
}
export default Message;