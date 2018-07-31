import { combineReducers } from 'redux';

import token from './token';
import profile from './profile';
import lists from './list';
import tasks from './task';

export default combineReducers({
  token, profile, lists, tasks,
});
