import {
  SET_FAVORITES,
  CREATE_FAVORITE,
  UPDATE_FAVORITE,
  DELETE_FAVORITE,
  LOAD_FAVORITE,
  CLEAR_FAVORITE
} from '../actions/types';

const INITIAL_STATE = {
  favorites: [],
  selected: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FAVORITES:
      return { favorites: action.payload };
    case CREATE_FAVORITE:
      return { favorites: [...state.favorites, action.payload] };
    case UPDATE_FAVORITE:
      return {
        favorites: [
          action.payload,
          ...state.favorites.filter(item => action.payload.id !== item.id)
        ]
      };
    case DELETE_FAVORITE:
      return { favorites: state.favorites.filter(item => action.payload !== item.id) };
    case LOAD_FAVORITE:
      return { ...state, selected: action.payload };
    case CLEAR_FAVORITE:
      return { favorites: [...state.favorites] };
    default:
      return state;
  }
}
