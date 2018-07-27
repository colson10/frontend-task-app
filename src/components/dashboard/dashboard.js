import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as profileActions from '../../actions/profile';
import autobind from '../../utils/auto-bind';

import './dashboard.scss';
import TaskForm from '../task-form/task-form';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    autobind.call(this, Dashboard);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.pFetchUserProfile();
    }
  }

  render() {
    return (
      <div className='dashboard'>
        {/* <h3>Hello, {this.props.profile.username}!</h3> */}
        <h4>Welcome to TASKsubtask</h4>
        <div>
          <TaskForm onComplete={this.props.pCreateTask}/>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object,
  loggedIn: PropTypes.bool,
  pFetchUserProfile: PropTypes.func,
  pCreateTask: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
  // pCreateTask 
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
