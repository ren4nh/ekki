import { reset } from 'redux-form';
import performRequest from '../configAxios';
import { SET_TRANSACTIONS, SET_USER, AUTH_FETCH, LOAD_DESTINATION } from './types';
import * as alerts from './Alert';
import * as auth from './Auth';

export const createTransaction = formProps => async dispatch => {
  try {
    dispatch({ type: AUTH_FETCH });

    const response = await performRequest('POST', '/transaction', formProps, true);

    const responseData = response.data.data;

    dispatch(alerts.showSuccessMessage('Salvo com sucesso'));
    dispatch({ type: SET_USER, payload: responseData });
    dispatch(reset('transferForm'));
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

export const setTransactions = () => async dispatch => {
  try {
    const response = await performRequest('GET', '/transaction/user', null, true);

    dispatch({ type: SET_TRANSACTIONS, payload: response.data.data });
  } catch (e) {
    console.log(e);
    if (e.response && e.response.status === 401) {
      dispatch(alerts.showErrorMessage('Sessão expirada, favor realizar o login novamente'));
      dispatch(auth.signout());
    } else {
      dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
    }
  }
};

export const loadDestination = data => ({
  type: LOAD_DESTINATION,
  payload: data
});
