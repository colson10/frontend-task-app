import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MIListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import FolderIcon from '@material-ui/icons/Folder';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// import StarBorder from '@material-ui/icons/StarBorder';

import autoBind from '../../utils/auto-bind';
import TaskForm from '../task-form/task-form';
import * as taskActions from '../../actions/task';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: false,
      checked: [0],
    };
    autoBind.call(this, ListItem);
  }


  handleClick() {
    this.setState(state => ({ open: !state.open }));
  }

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });

    const done = currentIndex === -1;
    this.props.pUpdateTaskStatus(value, done);
  }

  render() {
    const { 
      list, 
      tasks, 
      selectedList, 
      classes, 
    } = this.props;

    return (
      <div>
        <List
          component="div"
        >
          <MIListItem button onClick={this.handleClick} style={{ borderBottom: '1px solid black' }}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText inset primary={ <div key={list._id}>
              <h4>{list.title}</h4>
              </div> } />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </MIListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          {selectedList._id === list._id 
          && <div>
          { tasks.length > 0 
              && tasks.map((task) => {
                return (
                  <List key={task._id} component="div" disablePadding>
                    <MIListItem 
                      button 
                      className={classes.nested} 
                      onClick={() => this.handleToggle(task._id)}
                    >
                      <ListItemIcon>
                      <Checkbox
                        checked={this.state.checked.indexOf(task._id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        
                        
                      />
                      </ListItemIcon>
                      <ListItemText inset primary={<div >
                    {task.title} | Time: {task.time}
                </div>} />
                    </MIListItem>
                  </List>
                  
                );
              })
            }
            <TaskForm onComplete={this.props.pCreateTask} list={selectedList} />
          </div>
          }
            
          </Collapse>
        </List>
      {/* <div className='list-in-list' key={list._id}>
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
        } */}
      </div>
    );
  }
}

ListItem.propTypes = {
  list: PropTypes.object,
  pCreateTask: PropTypes.func,
  tasks: PropTypes.array,
  selectedList: PropTypes.object,
  classes: PropTypes.object,
  pUpdateTaskStatus: PropTypes.func,
};

const mapStateToProps = state => ({
  lists: state.lists,
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  pCreateTask: (task, list) => dispatch(taskActions.taskCreateRequest(task, list)),
  pUpdateTaskStatus: (task, value) => dispatch(taskActions.taskUpdateStatusRequest(task, value)),
});

export default compose(
  withStyles(styles, { name: 'ListItem' }),
  connect(mapStateToProps, mapDispatchToProps),
)(ListItem);
