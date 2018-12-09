import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

const customCheckBox = ({ input, name, label }) => {
    return (<FormGroup>
                <FormControlLabel
                    control ={
                        <Checkbox
                            {...input}
                            id={ name }
                            color='primary' 
                        />
                    }
                    label={ label }
                />
            </FormGroup>)
};

export default customCheckBox;