import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Header } from '../components/Header';

import { About } from './About';
import { Home } from './Home';
const TheRouter: React.FC = () => (
  <Router>
    <div>
      <div className="sidebar left-side">
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
      </div>
      <div className="sidebar rigth-side">
        <Header />
      </div>
    </div>
  </Router>
);

export default TheRouter;
