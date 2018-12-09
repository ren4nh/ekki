import React from 'react';
import { Select, FormGroup, MenuItem, InputLabel, FormHelperText} from '@material-ui/core';

const customSelect = ({ input, name, label, meta: { touched, error }, values, defaultValue }) => {
    
    return (
            <FormGroup>
                <InputLabel shrink htmlFor={ name }>{ label }</InputLabel>
                <Select
                        {...input}
                        id={ name }
                        name={ label }
                        error = {touched && error ? true : false} >
                    {values.map(value => {
                        return <MenuItem key={value.value} value={value.value}>{value.input}</MenuItem>
                    })}
                </Select>
                <FormHelperText id='name-error-text'>{touched && error ? error : ''}</FormHelperText>
            </FormGroup>)
};

export default customSelect;