import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { AUTHENTICATION_TOKEN } from './constants/config';
import './App.css';
import AddWallet from './components/AddWallet';
import CreateTransaction from './components/CreateTransaction';

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
      <Switch>
        <PrivateRoute path="/home" exact component={Dashboard} />
        <Route path="/addwallet/:blockchain" exact component={AddWallet} />
        <Route path="/addTransaction/:blockchain" exact component={CreateTransaction} />
        <Route path="/signup" exact component={SignupForm} />
        <Route path="/login" exact component={LoginForm} />
        <Redirect from="/*" to="/home" />
      </Switch>
    </Router>
  );
}

export default App;
