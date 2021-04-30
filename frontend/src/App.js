import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Channel from "./Channel";
import Login from "./Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      <Router>
        <div>
          <Switch>
            <Route path="/channel/:id" component={Channel} />
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
      </div>
      
    );
  }
}
export default App;
