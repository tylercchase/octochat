import React from "react";

class Message extends React.Component {
    render() {
        return (
            <div>
                {this.props.message.content}
            </div>
        )
    }
}
export default Message;