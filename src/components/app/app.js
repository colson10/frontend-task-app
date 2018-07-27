import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import Favicon from 'react-favicon';

import AuthRedirect from '../auth-redirect/auth-redirect';
import Header from '../header/header';
import Landing from '../landing/landing';
import Dashboard from '../dashboard/dashboard';
import Footer from '../footer/footer';

import ROUTES from '../../routes';
import '../../style/main.scss';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
          <Helmet>
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <meta property="og:title" content="TASKsubtask" />
            <meta property="og:type" content="website" />
            {/* <meta property="og:url" content="" /> */}
            {/* <meta property="og:image" content="../../assets/site-preview.png" /> */}
          </Helmet>
          <Header/>
          <Route path='*' component={AuthRedirect}/>
          {/* <Route exact path='/' component={Landing}/> */}
          <Route exact path={ROUTES.LANDING} component={Landing}/>
          <Route exact path={ROUTES.DASHBOARD} component={Dashboard}/>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}
