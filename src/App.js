import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Navigation } from './Navigation';
import ErrorBoundary from './ErrorBoundary';

import Users from './Users';
import User from './User';
import Distribuidores from './Distribuidores';
import Distribuidor from './Distribuidor';

function App() {
  return (
    <Router>
      <Navigation />

      <ErrorBoundary>
        <Route path="/users" component={Users} />
        <Route path="/user/:id?" component={User} />
        <Route path="/distribuidores" component={Distribuidores} />
        <Route path="/distribuidor/:id?" component={Distribuidor} />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
