import './Login.css';
import React from "react";
import { toast } from 'react-toastify'
import logo from './thingy.svg'
import Particles from 'react-particles-js';
class Login extends React.Component {
  handleChange(event) {
    this.setState({ value: event.target.value })
  }
  handleSubmit(event, _name) {
    if (_name.length > 50) {
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
    if (_name.length > 0 && _name.length < 50) {
      localStorage.setItem('name', _name)
      window.location.replace('http://localhost:4000/channel/general')
    }
    event.preventDefault();
  }
  constructor(props) {
    super(props)
    this.state = { value: '', }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {

    return (
      <div class="login-background">

        <div class="container">
          <img src={logo} alt="Logo" className="login-logo" />
          <div id="tagline"> A chat platform for Octopi by Octopi</div>
          <form onSubmit={(event) => { this.handleSubmit(event, this.state.value); this.setState({ value: '' }) }} >
            <input type="text" value={this.state.value} onChange={this.handleChange} id="input-name" placeholder="Enter a name"></input>
          </form>
        </div>

        <div className="particles">
          <Particles params={{
            "particles": {
              "number": {
                "value": 200,
                "density": {
                  "enable": false,
                  "value_area": 800
                }
              },
              "color": {
                "value": "#ffffff"
              },
              "shape": {
                "type": "image",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "octopus.png",
                  "width": 600,
                  "height": 600
                }
              },
              "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 12,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": false,
              },
              "modes": {
                "repulse": {
                  "distance": 300,
                  "duration": 0.4,
                }
              }

            },

          }} />
        </div>
      </div>

    )
  }
}
export default Login;