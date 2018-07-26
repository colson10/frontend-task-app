import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthRedirect from '../auth-redirect';
import Header from '../header';
import Landing from '../landing';
import Footer from '../footer';

import ROUTES from '../../routes';
import '../../style/main.scss';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>

          <Header/>
          <Route path='*' component={AuthRedirect}/>
          <Route exact path={ROUTES.LANDING} component={Landing}/>
          <Footer/>
      </BrowserRouter>
    );
  }
}
