import Header from './components/Header';
import Home from './pages/Home';
import Claim from './pages/Claim';
import Success from './pages/Success';
import CreateWallet from './pages/CreateWallet';
import GetBEP20 from './pages/GetBEP20';
import AddSelToken from './pages/AddSelToken';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import InstallMetamask from './pages/InstallMetamask';
import ChangeNetwork from './pages/ChangeNetwork';
import ScrollToTop from './utils/ScrollToTop';
import Invitation from './pages/Invitation/_id';

export default function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Header>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/claim-$sel' component={Claim} />
          <Route path='/success' component={Success} />
          <Route path='/createwallet' component={CreateWallet} />
          <Route path='/create-bep20wallet' component={GetBEP20} />
          <Route path='/add-seltoken-on-trustwallet' component={AddSelToken} />
          <Route path='/install-metamask' component={InstallMetamask} />
          <Route path='/change-network-to-binance-smartchain' component={ChangeNetwork} />
          <Route path='/invitation' component={Invitation} />
        </Switch>
      </Header>
    </Router>
  );
}