import React from "react";

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
            <form onSubmit={(event) => this.props.handleSubmit(event, this.state.value)}>
                <label>Message: </label>
                <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                <input type="submit" value="Send" />
            </form>
        )
    }
}
export default InputArea;