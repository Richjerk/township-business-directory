import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BusinessForm from './components/BusinessForm';
import UserForm from './components/UserForm';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Township Small Business Directory</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/add-business">Add Business</a></li>
              <li><a href="/register-user">Register User</a></li>
            </ul>
          </nav>
        </header>

        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/add-business" component={BusinessForm} />
          <Route path="/register-user" component={UserForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
