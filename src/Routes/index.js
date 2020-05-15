import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import AddPost from '../containers/AddPost';

export default () =>
  <Switch>
    <Route exact path={['/', '/home', '/index', '/posts']} component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/add-post" component={AddPost} />
    <Route path="*" render={() => (<h1 className="title has-text-centered">Not Found</h1>)} />
  </Switch>