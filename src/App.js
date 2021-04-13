import Header from './components/Header';
import Home from './pages/Home';
import Claim from './pages/Claim';
import Success from './pages/Success';
import CreateWallet from './pages/CreateWallet';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Header>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/claim-$sel' component={Claim} />
          <Route path='/success' component={Success} />
          <Route path='/createwallet' component={CreateWallet} />
        </Switch>
      </Header>
    </Router>
  );
}