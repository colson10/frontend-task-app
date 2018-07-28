import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as profileActions from '../../actions/profile';
import * as listActions from '../../actions/list';
import autobind from '../../utils/auto-bind';

import './dashboard.scss';
import ListForm from '../list-form/list-form';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const { lists } = this.props;
    return (
      <div className='dashboard'>
        {/* <h3>Hello, {this.props.profile.username}!</h3> */}
        <h4>Welcome to LISTsublist</h4>
        <div className='lists-sidebar'>
          <div className='lists-lists'>
          <h2>{ this.props.profile && this.props.profile.username }'s Lists</h2>
            { lists.length > 0 
              && lists.map((list) => {
                return (
                  <div className='list-in-list' key={list._id}>
                  <h4>{list.title}</h4>
                  <p>{list.details}  |  Time needed: {list.time}</p>
                </div>
                );
              })
            }
          </div>
          <div className='list-form-div'>
            <ListForm onComplete={this.props.pCreateList}/>
          </div>
        </div>
        <div className='tasks-list'>
          <h3>Add a list to this list</h3>
          <p>This is where a list of lists will go.</p>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object,
  loggedIn: PropTypes.bool,
  lists: PropTypes.array,
  pFetchUserProfile: PropTypes.func,
  pCreateList: PropTypes.func,
  pFetchUserLists: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
  lists: state.lists,
});

const mapDispatchToProps = dispatch => ({
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
  pCreateList: list => dispatch(listActions.listCreateRequest(list)), 
  pFetchUserLists: () => dispatch(listActions.fetchAllLists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
