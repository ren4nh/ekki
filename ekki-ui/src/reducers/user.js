import {
  SET_USER,
  ADD_FAVORITE,
  SET_TRANSACTIONS
} from "../actions/types";

const INITIAL_STATE = {
  user: {},
  favorites: [],
  transactions: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case ADD_FAVORITE:
      return { ...state, favorites: [action.payload, ...state.favorites] };
    case SET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
}
