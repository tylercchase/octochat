import './Login.css';
import React from "react";
import { toast } from 'react-toastify'
import logo from './thingy.svg'
class Login extends React.Component {
  handleChange(event) {
    this.setState({ value: event.target.value })
  }
  handleSubmit(event,_name) {
    if(_name.length > 50){
      toast.error('🐙 Name too long.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    if(_name.length > 0 && _name.length < 50){
      localStorage.setItem('name', _name)
      window.location.replace('http://chat.tylerchase.sexy:4000/channel/general')
    }
    event.preventDefault();
  }
  constructor(props) {
    super(props)
    this.state = {value: '',}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {

    return (
        <div class="login-background">

          <div class="container">
            <img src={logo} alt="Logo" className="login-logo"/>
            <div id="tagline"> A chat platform for Octopi by Octopi</div>
            <form onSubmit={(event) => {this.handleSubmit(event, this.state.value); this.setState({value: ''})}} >
                <input type="text" value={this.state.value} onChange={this.handleChange} id="input-name" placeholder="Enter a name"></input>
            </form>
          </div>
        </div>
    )
  }
}
export default Login;