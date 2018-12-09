import React from 'react';
import { TextField, FormHelperText, FormGroup } from '@material-ui/core';

const customInput = ({ input, name, label, type, multiline, disabled, autoFocus, inputProps, meta: { touched, error } }) => {
    return (<FormGroup>
                <TextField
                        {...input}
                        id={ name }
                        label={ label }
                        type={ type }
                        multiline= { multiline }
                        disabled = { disabled }
                        autoFocus = { autoFocus }
                        inputProps= { inputProps }
                        error = {touched && error ? true : false} />
                <FormHelperText id='name-error-text'>{touched && error ? error : ''}</FormHelperText>
            </FormGroup>)
};

export default customInput;