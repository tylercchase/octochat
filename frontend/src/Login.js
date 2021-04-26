import './Login.css';
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import logo from './octochat.png'
class Login extends React.Component {

  render() {

    return (
        <div class="login-background">
          <div class="container">
            <div id="logo"> Octochat </div>
            <Link to={`/channel/1`}>Link to a channel page</Link>
          </div>
        </div>
    )
  }
}
export default Login;