import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as profileActions from '../../actions/profile';
import * as taskActions from '../../actions/task';
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
      this.props.pFetchUserProfile()
        .then(() => {
          return this.props.pFetchUserTasks();
        });
    }
  }

  render() {
    const { tasks } = this.props;
    return (
      <div className='dashboard'>
        {/* <h3>Hello, {this.props.profile.username}!</h3> */}
        <h4>Welcome to TASKsubtask</h4>
        <div>
          <TaskForm onComplete={this.props.pCreateTask}/>
        </div>
        <div>
          { tasks.length > 0 
            && tasks.map((task) => {
              return (
                <div key={task._id}>
                <h4>{task.title}</h4>
                <p>{task.details}  |  Time needed: {task.time}</p>
              </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object,
  loggedIn: PropTypes.bool,
  tasks: PropTypes.array,
  pFetchUserProfile: PropTypes.func,
  pCreateTask: PropTypes.func,
  pFetchUserTasks: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
  pCreateTask: task => dispatch(taskActions.taskCreateRequest(task)), 
  pFetchUserTasks: () => dispatch(taskActions.fetchAllTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
