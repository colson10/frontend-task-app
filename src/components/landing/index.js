import React from 'react';

export default class Landing extends React.Component {
  render() {
    return (
      <div className='landing-page'>
        <p className='hero-text'>
          TASKsubtask 
          <a href='https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/oauth/google&scope=openid%20email%20profile&client_id=391898223520-nodlikiik4v7118fhe3lofn9n3irl3kd.apps.googleusercontent.com&prompt=consent&response_type=code'>Login / SignUp </a>
        </p>
      </div>
    );
  }
}
