import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import card from './creditCards';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    alert,
    auth,
    user,
    card,
    form: formReducer
});