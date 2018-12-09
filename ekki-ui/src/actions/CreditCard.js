import { CREATE_CARD, AUTH_FETCH, SET_CARDS, LOAD_CARD, DELETE_CARD, UPDATE_CARD } from './types';
import * as alerts from './Alert';
import performRequest from '../configAxios';
import { reset } from "redux-form";

export const createCreditCard = (formProps) => async dispatch => {
    try {
        dispatch({ type: AUTH_FETCH});
        
        const response = await performRequest('POST', "/credit-card", formProps, true);

        const responseData = response.data.data;

        dispatch({ type: CREATE_CARD, payload: responseData });
        
    } catch (e) {
        console.log(e);
        if(e.response) {
            if(e.response.status === 403 || e.response.status === 401 || e.response.status === 400) {
                dispatch(alerts.showErrorMessage(e.response.data.message));
            }
        } else {
            dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
        }
    } finally {
        dispatch({ type: AUTH_FETCH});
    }
};

export const updateCreditCard = formProps => async dispatch => {
    try {
      dispatch({ type: AUTH_FETCH });
  
      const response = await performRequest(
        "PUT",
        "/credit-card/" + formProps.id,
        formProps,
        true
      );
  
      const responseData = response.data.data;
  
      dispatch({ type: UPDATE_CARD, payload: responseData });
      dispatch(alerts.showSuccessMessage("Salvo com sucesso"));
      dispatch(reset("creditCardForm"));
    } catch (e) {
        console.log(e);
        if(e.response) {
            if(e.response.status === 403 || e.response.status === 401 || e.response.status === 400) {
                dispatch(alerts.showErrorMessage(e.response.data.message));
            }
        } else {
            dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
        }
    } finally {
      dispatch({ type: AUTH_FETCH });
    }
  };
  
  export const deleteCreditCard = id => async dispatch => {
    try {
      dispatch({ type: AUTH_FETCH });
  
      const response = await performRequest(
        "DELETE",
        "/credit-card/" + id,
        null,
        true
      );
  
      const responseData = response.data.data;
  
      dispatch({ type: DELETE_CARD, payload: responseData });
      dispatch(alerts.showSuccessMessage("Deletado com sucesso"));
    } catch (e) {
        console.log(e);
        if(e.response) {
            if(e.response.status === 403 || e.response.status === 401 || e.response.status === 400) {
                dispatch(alerts.showErrorMessage(e.response.data.message));
            }
        } else {
            dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
        }
    } finally {
      dispatch({ type: AUTH_FETCH });
    }
  };

export const getAllCards = () => async dispatch => {
    try {
        dispatch({ type: AUTH_FETCH});
        
        const response = await performRequest('GET', "/credit-card/user", null, true);

        const responseData = response.data.data;

        dispatch({ type: SET_CARDS, payload: responseData });
        
    } catch (e) {
        console.log(e);
        if(e.response) {
            if(e.response.status === 403 || e.response.status === 401 || e.response.status === 400) {
                dispatch(alerts.showErrorMessage(e.response.data.message));
            }
        } else {
            dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
        }
    } finally {
        dispatch({ type: AUTH_FETCH});
    }
};


export const loadCard = data => ({
    type: LOAD_CARD,
    payload: data
  });