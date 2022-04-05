import React from 'react';
import { Switch, Route } from 'react-router-dom';
import login from './pages/login';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={ login } />
      </Switch>
    </div>
  );
}
