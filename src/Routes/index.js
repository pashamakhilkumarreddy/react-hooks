import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';

export default () =>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route path="*" render={() => (<h1 className="title has-text-centered">Not Found</h1>)} />
  </Switch>