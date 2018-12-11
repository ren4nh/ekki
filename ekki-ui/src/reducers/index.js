import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import alert from './alert';
import auth from './auth';
import user from './user';
import card from './creditCards';
import transaction from './transaction';
import favorite from './favorite';

export default combineReducers({
  alert,
  auth,
  user,
  card,
  favorite,
  transaction,
  form: formReducer
});
