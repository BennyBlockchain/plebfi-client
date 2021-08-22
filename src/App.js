import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import UserPage from "./components/UserPage";

import "./App.css";
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/u/:username" component={UserPage} />
    </Switch>
  );
}

export default App;
