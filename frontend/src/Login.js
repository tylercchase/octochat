import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
class Login extends React.Component {

  render() {

    return (
        <div>
            Login page!
            <Link to={`/components`}>Link to a channel page</Link>
        </div>
    )
  }
}
export default Login;