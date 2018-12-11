import {
  SET_CARDS,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  LOAD_CARD,
  CLEAR_CARD
} from '../actions/types';

const INITIAL_STATE = {
  cards: [],
  selected: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CARDS:
      return { cards: action.payload };
    case CREATE_CARD:
      return { cards: [...state.cards, action.payload] };
    case UPDATE_CARD:
      return {
        cards: [action.payload, ...state.cards.filter(item => action.payload.id !== item.id)]
      };
    case DELETE_CARD:
      return { cards: state.cards.filter(item => action.payload !== item.id) };
    case LOAD_CARD:
      return { ...state, selected: action.payload };
    case CLEAR_CARD:
      return { cards: [...state.cards] };
    default:
      return state;
  }
}
