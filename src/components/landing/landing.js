import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ROUTES, API_URL } from '../../routes';

let redirect = false;
let destinationRoute = null;

const googleLink = `${API_URL}/oauth/google`;

class Landing extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      redirect = true;
      destinationRoute = '/dashboard';
      this.props.history.push(ROUTES.DASHBOARD);
    }
  }

  render() {
    const loginView = (
      <div>
        <div>
          <h2 className='hero-text'>
          TimeBoxed 
          </h2>
        </div>
        <div>
          <p><a href={googleLink}>Login/SignUp with Google</a></p>
        </div>
      </div>
    );

    return (
      <div className='landing-page'>
        { redirect ? <Redirect to={destinationRoute}/> : loginView }
      </div>
    );
  }
}

Landing.propTypes = {
  loggedIn: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

export default connect(mapStateToProps)(Landing);
