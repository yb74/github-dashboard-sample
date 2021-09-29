import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import './App.css';


import NavBar from "./components/pages/NavBar";
// import SearchBarProcess from "./components/searchbar/SearchBarProcess";
import SearchBar from "./components/pages/SearchBar";
import RepoDetails from "./components/pages/RepoDetails";
import RepoList from "./components/RepoList";

function App() {
  return (
    <div className="App">
        <Router>
            <NavBar />

        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path="/" component={SearchBar} />
                <Route path="/repo-list" component={RepoList} />
                <Route path="/repo-details/:login/:repo" component={RepoDetails} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;