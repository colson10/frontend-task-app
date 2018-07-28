import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/auto-bind';

const defaultState = {
  title: '',
  details: '',
  time: 30,
};

class ListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, ListForm);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state, 'this is the state in the handlesubmit');
    // this.setState(this.props.list ? this.state : defaultState);
    return this.props.onComplete(this.state);
  }

  render() {
    const buttonText = this.props.list ? 'Update List' : 'Create New List';
    return (
      <div className='list-form-container'>
        <form className='list-form' onSubmit={this.handleSubmit}>
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

          <input
          type='number'
          name='time'
          placeholder='30 minutes'
          value={this.state.time}
          onChange={this.handleChange}
          />
          <button type='submit'>{buttonText}</button>
        </form>
      </div>
    );
  }
}

ListForm.propTypes = {
  list: PropTypes.object,
  onComplete: PropTypes.func,
};

export default ListForm;
