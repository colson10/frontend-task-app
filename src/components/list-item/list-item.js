import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskForm from '../task-form/task-form';
import * as taskActions from '../../actions/task';


class ListItem extends React.Component {
  render() {
    const { list, tasks, selectedList } = this.props;
    return (
      <div>
      <div className='list-in-list' key={list._id}>
        <h4>{list.title}</h4>
        <p>{list.details}  |  Time needed: {list.time}</p>
      </div>
        {selectedList._id === list._id 
        && <div className='tasks-list'>
          <h3>Add a task to this list</h3>
          <TaskForm onComplete={this.props.pCreateTask} list={selectedList} />
          { tasks.length > 0 
              && tasks.map((task) => {
                return (
                  <div className='single-task' list={task} key={task._id}>
                    <h2>{task.title} | {task.details} | {task.time}</h2>
                  </div>
                );
              })
            }
        </div>
        }
      </div>
    );
  }
}

ListItem.propTypes = {
  list: PropTypes.object,
  pCreateTask: PropTypes.func,
  tasks: PropTypes.array,
  selectedList: PropTypes.object,
};

const mapStateToProps = state => ({
  lists: state.lists,
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  pCreateTask: (task, list) => dispatch(taskActions.taskCreateRequest(task, list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
