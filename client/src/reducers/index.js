import { combineReducers } from 'redux';
import photoReducer from './photoReducer';
import errorReducer from './errorReducer';
import commentReducer from './commentReducer';

import authReducer from './authReducer';




export default combineReducers({
  photos: photoReducer,
  error: errorReducer,
  auth: authReducer,
  comments: commentReducer
})
