import React from "react";
import './InputArea.css';
class InputArea extends React.Component {
    handleChange(event) {
        this.setState({ value: event.target.value })
    }
    constructor(props) {
        super(props)
        this.state = {value: '',}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.props.handleSubmit.bind(this)
    }

    render() {
        return (
            <form onSubmit={(event) => {this.props.handleSubmit(event, this.state.value); this.setState({value: ''})}} id="message-input">
                <input type="text" value={this.state.value} onChange={this.handleChange} id="send-area" placeholder="Send a message"></input>
            </form>
        )
    }
}
export default InputArea;