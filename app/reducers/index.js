import { combineReducers } from 'redux';
import todos from './todos';
import analytics from './analytics';
export default combineReducers({
  todos,
  analytics
});
