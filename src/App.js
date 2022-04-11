import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Play from './pages/Play';
import './App.css';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/play" component={ Play } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/*" component={ NotFound } />
      </Switch>
    </div>
  );
}
