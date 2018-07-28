import { combineReducers } from 'redux';

import token from './token';
import profile from './profile';
import lists from './list';

export default combineReducers({
  token, profile, lists,
});
