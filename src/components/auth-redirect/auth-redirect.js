import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as ROUTES from '../../routes';

class AuthRedirect extends Component {
  render() {
    const { location, token } = this.props;
    const { pathname } = location;

    let destinationRoute = null;

    switch (pathname) {
      case ROUTES.LANDING:
        if (token) destinationRoute = ROUTES.DASHBOARD;
        break;
      case ROUTES.DASHBOARD:
        if (!token) destinationRoute = ROUTES.LANDING;
        break;
      default:
        if (!token) destinationRoute = ROUTES.LANDING;
        break;
    }
    return (
      <div>
        { destinationRoute ? <Redirect to={ destinationRoute }/> : undefined }
      </div>
    );
  }
}

AuthRedirect.propTypes = {
  token: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  token: !!state.token,
});

export default connect(mapStateToProps)(AuthRedirect);
