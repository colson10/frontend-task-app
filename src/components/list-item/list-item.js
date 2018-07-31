import React from 'react';
import PropTypes from 'prop-types';

class ListItem extends React.Component {
  render() {
    const { list } = this.props;
    return (
      <div className='list-in-list' key={list._id}>
        <h4>{list.title}</h4>
        <p>{list.details}  |  Time needed: {list.time}</p>
      </div>
    );
  }
}

ListItem.propTypes = {
  list: PropTypes.object,
};

export default ListItem;
