import { SET_TRANSACTIONS, CREATE_TRANSACTION, LOAD_DESTINATION } from '../actions/types';

const INITIAL_STATE = {
  transactions: [],
  destination: undefined
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return { transactions: action.payload };
    case CREATE_TRANSACTION:
      return { transactions: [...state.transactions, action.payload] };
    case LOAD_DESTINATION:
      return { ...state, destination: action.payload };
    default:
      return state;
  }
}
