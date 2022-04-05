import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Play from './pages/Play';
import './App.css';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/play" component={ Play } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
