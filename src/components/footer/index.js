import React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from '../../routes';

import './footer.scss';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Link to={ROUTES.LANDING} >Home</Link>
      </footer>
    );
  }
}
