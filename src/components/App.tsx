import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Header } from '../components/Header';

import { About } from './About';
import { Home } from './Home';
import { Login } from './Login';

const TheRouter: React.FC = () => (
  <Router>
    <div>
      <Header />

      <Route exact path="/login" component={Login} />
      <Route path="/about" component={About} />
      <Route path="/" component={Home} />
    </div>
  </Router>
);

export default TheRouter;
