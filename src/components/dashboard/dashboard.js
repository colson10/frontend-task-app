import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as profileActions from '../../actions/profile';
import * as listActions from '../../actions/list';
import * as taskActions from '../../actions/task';
import autobind from '../../utils/auto-bind';

import './dashboard.scss';
import ListForm from '../list-form/list-form';
import ListItem from '../list-item/list-item';
// import TaskForm from '../task-form/task-form';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: {},
    };
    autobind.call(this, Dashboard);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.pFetchUserProfile()
        .then(() => {
          return this.props.pFetchUserLists();
        });
    }
  }

  handleListSelect(list) {
    this.setState({ selectedList: list });
    this.props.pFetchTasks(list._id);
  }

  render() {
    const { lists } = this.props;
    return (
      <div className='dashboard'>
        <div className='lists-sidebar'>
        <div className='list-form-div'>
            <ListForm onComplete={this.props.pCreateList}/>
          </div>
          <div className='lists-lists'>
          <h2>{this.props.profile && 'My Inbox'}</h2>
            { lists.length > 0 
              && lists.map((list) => {
                return (
                  <div onClick={() => this.handleListSelect(list)} className='list-item-div' key={list._id}>
                    <ListItem list={list} key={list._id} selectedList={this.state.selectedList}/>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object,
  loggedIn: PropTypes.bool,
  lists: PropTypes.array,
  tasks: PropTypes.array,
  pFetchUserProfile: PropTypes.func,
  pCreateList: PropTypes.func,
  pFetchUserLists: PropTypes.func,
  pFetchTasks: PropTypes.func,
  pCreateTask: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
  lists: state.lists,
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
  pCreateList: list => dispatch(listActions.listCreateRequest(list)), 
  pFetchUserLists: () => dispatch(listActions.fetchAllLists()),
  pFetchTasks: selectedList => dispatch(taskActions.fetchAllTasks(selectedList)),
  pCreateTask: (task, list) => dispatch(taskActions.taskCreateRequest(task, list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
