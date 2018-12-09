import performRequest from '../configAxios';
import { SET_TRANSACTIONS } from './types';
import * as alerts from './Alert';
import * as auth from './Auth';
import { reset } from 'redux-form';

export const setTransactions = () => async dispatch => {
    try {
        const response = await performRequest('GET', '/transaction/user', null, true);

        dispatch({ type: SET_TRANSACTIONS, payload: response.data.data });

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

