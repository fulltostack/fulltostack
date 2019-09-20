import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import './App.css';
import AddbtcWallet from './components/AddbtcWallet';
import Addtransaction from './components/Addtransaction';

function App() {
  return (
    <Router>
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/addbtcwallet" exact component={AddbtcWallet} />
      <Route path="/addtransaction" exact component={Addtransaction} />

      {/* <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} /> */}
    </Router>
  );
}

export default App;
