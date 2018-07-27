import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class AuthRedirect extends Component {
  render() {
    const destinationRoute = null;
    
    return (
      <div>
        { destinationRoute ? <Redirect to={ destinationRoute }/> : undefined }
      </div>
    );
  }
}

export default AuthRedirect;
