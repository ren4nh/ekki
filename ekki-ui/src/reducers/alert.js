import { SHOW_TOAST, CLOSE_TOAST, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../actions/types';

const INITIAL_STATE = {
    type: 'success',
    message: 'ok'
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SHOW_TOAST:
        case CLOSE_TOAST:
            return { ...state, open: action.payload };
        case SUCCESS_MESSAGE:
            return { ...state, message:action.payload, type: 'success'}
        case ERROR_MESSAGE:
            return { ...state, message: action.payload, type: 'error' };
        default:
            return state;
    }
};