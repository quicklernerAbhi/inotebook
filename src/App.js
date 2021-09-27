import "./App.css";
import About from "./componants/About";
import Home from "./componants/Home";
import Navbar from "./componants/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./contexts/NoteState";
import Alert from "./componants/Alert";
import Login from "./componants/Login";
import SignUp from "./componants/SignUp";

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert />
        <div className="container">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
