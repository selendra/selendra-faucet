import { Row, Col, Form, Input, Button, message } from 'antd';
import './App.css';
import Header from './components/Header';
import { useState } from 'react';
import axios from 'axios';
import About from './pages/About';
import Introduction from './pages/HowToGet/introduction';
import Success from './pages/Success';
import CreateWallet from './pages/CreateWallet';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

export default function App() {
  return (
    <>
      <Router>
        <Header>
          <Switch>
            <Route path='/' exact component={About} />
            <Route path='/claim-$sel' component={Introduction} />
            <Route path='/success' component={Success} />
            <Route path='/createwallet' component={CreateWallet} />
          </Switch>
        </Header>
      </Router>
    </>
  );
}