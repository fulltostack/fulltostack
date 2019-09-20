import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AUTHENTICATION_TOKEN } from './constants/config';
import './App.css';
import AddbtcWallet from './components/AddbtcWallet';
import Addtransaction from './components/Addtransaction';

const getToken = () => localStorage.getItem(AUTHENTICATION_TOKEN);

const isAuthenticated = () => {
  const token = getToken();
  return token && token.length > 0;
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <Route path="/home" exact component={Dashboard} />
      <Route path="/addbtcwallet" exact component={AddbtcWallet} />
      <Route path="/addtransaction" exact component={Addtransaction} />

      <Route path="/signup" exact component={Signup} />
      <Route path="/login" exact component={Login} />
      {/* <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} /> */}
    </Router>
  );
}

export default App;
