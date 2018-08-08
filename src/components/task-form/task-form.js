import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import autoBind from '../../utils/auto-bind';

const defaultState = {
  title: '',
  details: '',
  time: 30,
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, TaskForm);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.setState(this.props.task ? this.state : defaultState);
    return this.props.onComplete(this.state, this.props.list._id);
  }

  render() {
    const { classes } = this.props;

    const buttonText = this.props.task ? 'Update Task' : 'Create New Task';
    return (
      <div className='task-form-container'>
        <form className='task-form' onSubmit={this.handleSubmit}>
        <TextField
          id="title"
          label="Create New Task"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange}
          margin="normal"
        />
        <Button 
          size="small" 
          variant="outlined" 
          className={classes.button}
        >
          {buttonText}
        </Button>  
        {/* <input
          type='text'
          name='title'
          placeholder='Task Title'
          value={this.state.title}
          onChange={this.handleChange}
        /> */}
          {/* <input
          type='text'
          name='details'
          placeholder='task details'
          value={this.state.details}
          onChange={this.handleChange}
          /> */}

          {/* <input
          type='number'
          name='time'
          placeholder='30 minutes'
          value={this.state.time}
          onChange={this.handleChange}
          /> */}
          {/* <button type='submit'>{buttonText}</button> */}
        </form>
      </div>
    );
  }
}

TaskForm.propTypes = {
  task: PropTypes.object,
  list: PropTypes.object,
  onComplete: PropTypes.func,
  classes: PropTypes.object,
};

export default withStyles(styles)(TaskForm);
