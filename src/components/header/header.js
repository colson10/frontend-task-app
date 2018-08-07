import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import './header.scss';

export default class Header extends Component {
  render() {
    return (
      <header>
        <nav className='topnav'>
        
        <div className='home-link'>
          <div className='link'>
            <Link to={ROUTES.LANDING} >Home</Link>
          </div>
        </div>
        <h4 className='welcome'>TimeBoxed</h4>
        </nav>
      </header>
    );
  }
}