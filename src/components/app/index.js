import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import Favicon from 'react-favicon';

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
      <div>
          <Helmet>
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <meta property="og:title" content="TASKsubTASK" />
            <meta property="og:type" content="website" />
            {/* <meta property="og:url" content="" /> */}
            {/* <meta property="og:image" content="../../assets/site-preview.png" /> */}
          </Helmet>
          <Header/>
          <Route path='*' component={AuthRedirect}/>
          <Route exact path={ROUTES.LANDING} component={Landing}/>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}
