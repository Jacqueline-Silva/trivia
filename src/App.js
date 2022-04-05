import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Play from './pages/Play';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={ Login } />
        <Route path="/play" component={ Play } />
      </Switch>
    </div>
  );
}
