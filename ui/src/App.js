import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import './App.css';

function App() {
  return (
    <Router>
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signin" exact component={SignIn} />
      {/* <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} /> */}
    </Router>
  );
}

export default App;
