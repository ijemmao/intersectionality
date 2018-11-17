import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import DetailedTerm from './pages/detailed-term';
import './App.css';


const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/term/:id" component={DetailedTerm} />
        <Route render={() => (<div>post not found</div>)} />
      </Switch>
    </Router>
  )
}

export default App;