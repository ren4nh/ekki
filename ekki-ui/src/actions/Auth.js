import { AUTH_USER, AUTH_FETCH } from './types';
import * as alerts from './Alert';
import performRequest from '../configAxios';
import { push } from 'connected-react-router';

export const signin = (formProps) => async dispatch => {
    try {
        dispatch({ type: AUTH_FETCH});
        
        const response = await performRequest('POST', "/auth", formProps, false);

        const responseData = response.data.data;

        localStorage.setItem('Token', responseData.token);

        dispatch({ type: AUTH_USER, payload: responseData.token });
        
        dispatch(push('/dashboard'));
    } catch (e) {
        console.log(e);
        if(e.response) {
            if(e.response.status === 403 || e.response.status === 401 || e.response.status === 400) {
                dispatch(alerts.showErrorMessage('Usuário ou senha inválida'));
            }
        } else {
            dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
        }
    } finally {
        dispatch({ type: AUTH_FETCH});
    }
};

export const signout = () => async dispatch => {
    localStorage.removeItem('Token');

    dispatch({ type: AUTH_USER, payload: '' });

    dispatch(push("/login"));
}

export const validateToken = (formProps) => async dispatch => {
    try {
        
        const response = await performRequest('POST', "/auth/validateToken", formProps, false);

        const responseData = response.data.data;

        localStorage.setItem('Token', responseData.token);

        dispatch({ type: AUTH_USER, payload: responseData.token });
        
        dispatch(push('/dashboard'));
    } catch (e) {
        dispatch(push('/login'));
        dispatch(alerts.showErrorMessage('Erro na autenticação tente novamente!'));
    }
};

export const signup = (formProps) => async dispatch => {
    try {
        dispatch({ type: AUTH_FETCH});
        await performRequest('POST', "/user/register", formProps, false);

        dispatch(alerts.showSuccessMessage('Usuário cadastrado com sucesso!'));
        
        dispatch(push("/login"));
    } catch (e) {
        console.log(e);
        if(e.response) {
            if(e.response.status === 400 || e.response.status === 404) {
                dispatch(alerts.showErrorMessage(e.response.data.message));
            }
        } else {
            dispatch(alerts.showErrorMessage('Erro ao se comunicar com o servidor!'));
        }
    } finally {
        dispatch({ type: AUTH_FETCH});
    }
};
