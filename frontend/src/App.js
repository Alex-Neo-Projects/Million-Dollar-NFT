import './App.css';
import Home from './components/Home';
import Redeem from './components/Redeem';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/redeem">
            <Redeem />
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;