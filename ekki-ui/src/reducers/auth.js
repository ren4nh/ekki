import { AUTH_USER, AUTH_FETCH } from '../actions/types';

const INITIAL_STATE = {
    authenticated: '',
    isFetching: false
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, authenticated: action.payload };
        case AUTH_FETCH:
            return { ...state, isFetching: !state.isFetching };
        default:
            return state;
    }
};