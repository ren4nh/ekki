import performRequest from '../configAxios';
import { SET_USER } from './types';
import * as alerts from './Alert';
import * as auth from './Auth';
import { reset } from 'redux-form';
import { push } from 'connected-react-router';

export const setUser = () => async dispatch => {
    try {
        const response = await performRequest('GET', '/user/me', null, true);

        if (!response.data.success) {
            dispatch(alerts.showErrorMessage(response.data.message));
            return;
        }

        dispatch({ type: SET_USER, payload: response.data.data });

    } catch(e) {
        console.log(e);
        if(e.response && e.response.status === 401) {
            dispatch(alerts.showErrorMessage('Sessão expirada, favor realizar o login novamente'));
            dispatch(auth.signout());
        } else {
            dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
        }
    }
}


export const forgotPassword = (formProps) => async dispatch => {
    try {
        await performRequest('POST', '/user/forgotPassword', formProps, false);

        dispatch(alerts.showSuccessMessage('Enviado email com as instruções para a redefinição da senha'));
        dispatch(reset('forgotPassword'));

    } catch(e) {
        console.log(e);
        if(e.response) {
            if(e.response.status === 400 || e.response.status === 404) {
                dispatch(alerts.showErrorMessage(e.response.data.message));
            }
        } else {
            dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
        }
    }
}


export const changePassword = (formProps) => async dispatch => {
    try {
        await performRequest('POST', '/user/changePassword', formProps, false);

        dispatch(alerts.showSuccessMessage('Senha modificada com sucesso'));
        dispatch(reset('changePassword'));

        dispatch(push("/login"));

    } catch(e) {
        console.log(e);
        if(e.response) {
            if(e.response.status === 400 || e.response.status === 404) {
                dispatch(alerts.showErrorMessage(e.response.data.message));
            }
        } else {
            dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
        }
    }
}