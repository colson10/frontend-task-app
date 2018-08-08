import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import Button from '@material-ui/core/Button';

import autoBind from '../../utils/auto-bind';


const defaultState = {
  title: '',
  details: '',
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

class ListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, ListForm);
  }

  handleChange(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.setState(this.props.list ? this.state : defaultState);
    return this.props.onComplete(this.state);
  }

  render() {
    const buttonText = this.props.list ? 'Update List' : 'Create New List';
    const { classes } = this.props;

    return (
      <div className='list-form-container'>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
      
        <TextField
          id="title"
          label="Create New List"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CreateNewFolder />
              </InputAdornment>
            ),
          }}
        />
        {/* <TextField
          id="details"
          label="Details"
          className={classes.textField}
          value={this.state.details}
          onChange={this.handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Details />
              </InputAdornment>
            ),
          }}
        /> */}
        <Button size="small" variant="outlined" className={classes.button}>
          {buttonText}
        </Button>      
      </form>
        {/* <form className='list-form' onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='List Title'
          value={this.state.title}
          onChange={this.handleChange}
          />
          <input
          type='text'
          name='details'
          placeholder='list details'
          value={this.state.details}
          onChange={this.handleChange}
          />
          <button type='submit'>{buttonText}</button>
        </form> */}
      </div>
    );
  }
}

ListForm.propTypes = {
  list: PropTypes.object,
  onComplete: PropTypes.func,
  classes: PropTypes.object,
};

export default withStyles(styles)(ListForm);
