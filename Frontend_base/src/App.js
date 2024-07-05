import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import BooksList from './components/Books/BooksList';
import AuthorsList from './components/Authors/AuthorsList';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/books" component={BooksList} />
          <Route path="/authors" component={AuthorsList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
