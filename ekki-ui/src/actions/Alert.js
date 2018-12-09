import { SHOW_TOAST, CLOSE_TOAST, SUCCESS_MESSAGE, ERROR_MESSAGE} from './types';

export const showSuccessMessage = (message) => dispatch => {
    dispatch({
        type: SUCCESS_MESSAGE,
        payload: message
    });
    dispatch({
        type: SHOW_TOAST,
        payload: true
    });
};

export const showErrorMessage = (message) => dispatch => {
    dispatch({
        type: ERROR_MESSAGE,
        payload: message
    });
    dispatch({
        type: SHOW_TOAST,
        payload: true
    });
};

export const showMessage = () => {
    return {
        type: SHOW_TOAST,
        payload: true
    }
};

export const closeMessage = () => {
    return {
        type: CLOSE_TOAST,
        payload: false
    }
};

export default (showErrorMessage, showMessage, showSuccessMessage, closeMessage);