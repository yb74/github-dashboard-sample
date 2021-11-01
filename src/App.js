import React from "react";
import {Switch, Route} from "react-router-dom";

import './App.css';


import NavBar from "./components/Header/NavBar";
// import SearchBarProcess from "./components/searchbar/SearchBarProcess";
import GithubProfileSearch from "./components/pages/GithubProfileSearch";
import RepoDetails from "./components/pages/RepoDetails";
import RepoList from "./components/pages/RepoList";

function App() {
  return (
    <div className="App">
        <NavBar />

    {/* A <Switch> looks through its children <Route>s and
    renders the first one that matches the current URL. */}
        <Switch>
            <Route exact path="/" component={GithubProfileSearch} />
            <Route path="/repo-list" component={RepoList} />
            <Route path="/repo-details/:id/:repo" component={RepoDetails} />
        </Switch>
    </div>
  );
}

export default App;
