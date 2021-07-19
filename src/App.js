import "./App.css";
import Navbar from "./Components/Navbar";
import GetStarted from "./Components/GetStarted";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {

  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact>
            <GetStarted />
          </Route>
          <Route path='/home' exact>
            <Home />
          </Route>
          <Route path='/Sign-up' exact>
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
