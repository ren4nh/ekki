import { reset } from 'redux-form';
import {
  CREATE_FAVORITE,
  AUTH_FETCH,
  SET_FAVORITES,
  LOAD_FAVORITE,
  DELETE_FAVORITE,
  UPDATE_FAVORITE,
  CLEAR_FAVORITE
} from './types';
import * as alerts from './Alert';
import performRequest from '../configAxios';

export const createFavorite = formProps => async dispatch => {
  try {
    dispatch({ type: AUTH_FETCH });

    const response = await performRequest('POST', '/favorite', formProps, true);

    const responseData = response.data.data;

    dispatch(alerts.showSuccessMessage('Salvo com sucesso'));
    dispatch({ type: CREATE_FAVORITE, payload: responseData });
    dispatch(reset('favoriteForm'));
  } catch (e) {
    console.log(e);
    if (e.response) {
      if (e.response.status === 403 || e.response.status === 401 || e.response.status === 400) {
        dispatch(alerts.showErrorMessage(e.response.data.message));
      }
    } else {
      dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
    }
  } finally {
    dispatch({ type: AUTH_FETCH });
  }
};

export const updateFavorite = formProps => async dispatch => {
  try {
    dispatch({ type: AUTH_FETCH });

    const response = await performRequest('PUT', `/favorite/${formProps.id}`, formProps, true);

    const responseData = response.data.data;

    dispatch({ type: UPDATE_FAVORITE, payload: responseData });
    dispatch(alerts.showSuccessMessage('Salvo com sucesso'));
    dispatch(reset('favoriteForm'));
  } catch (e) {
    console.log(e);
    if (e.response) {
      if (e.response.status === 403 || e.response.status === 401 || e.response.status === 400) {
        dispatch(alerts.showErrorMessage(e.response.data.message));
      }
    } else {
      dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
    }
  } finally {
    dispatch({ type: AUTH_FETCH });
  }
};

export const deleteFavorite = id => async dispatch => {
  try {
    dispatch({ type: AUTH_FETCH });

    await performRequest('DELETE', `/favorite/${id}`, null, true);

    dispatch({ type: DELETE_FAVORITE, payload: id });
    dispatch(alerts.showSuccessMessage('Deletado com sucesso'));
  } catch (e) {
    console.log(e);
    if (e.response) {
      if (e.response.status === 403 || e.response.status === 401 || e.response.status === 400) {
        dispatch(alerts.showErrorMessage(e.response.data.message));
      }
    } else {
      dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
    }
  } finally {
    dispatch({ type: AUTH_FETCH });
  }
};

export const getAllFavorites = () => async dispatch => {
  try {
    dispatch({ type: AUTH_FETCH });

    const response = await performRequest('GET', '/favorite/user', null, true);

    const responseData = response.data.data;

    dispatch({ type: SET_FAVORITES, payload: responseData });
  } catch (e) {
    console.log(e);
    if (e.response) {
      if (e.response.status === 403 || e.response.status === 401 || e.response.status === 400) {
        dispatch(alerts.showErrorMessage(e.response.data.message));
      }
    } else {
      dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
    }
  } finally {
    dispatch({ type: AUTH_FETCH });
  }
};

export const loadFavorite = data => ({
  type: LOAD_FAVORITE,
  payload: data
});

export const clearFavorite = data => ({
  type: CLEAR_FAVORITE
});
