import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, withMobileDialog, DialogContentText, withStyles} from '@material-ui/core';
import customInput from './custom/customInput';
import * as actions from '../actions';

class PasswordModal extends Component {

    handleClose = () => {
        this.props.toogle();
    };

    onSubmit = (formProps) => {
        this.props.validatePassword(formProps, () => {
            this.handleClose();
            this.props.callback();
        });
    }
    
    render() {
        const { handleSubmit } = this.props

        return (
            <div>
                <Dialog
                    open={true}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    disableBackdropClick
                >
                <DialogTitle id="form-dialog-title">Senha</DialogTitle>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <DialogContent>
                        <DialogContentText> Informe sua senha para concluir a transferencia </DialogContentText>
                            <Field name="password" label="Senha" component={customInput} autoFocus type='password'  />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button type='submit' color="primary">
                            Concluir
                        </Button>
                        </DialogActions>
                    </form>
            </Dialog>
          </div>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.password) {
       errors.password = 'Senha deve ser informada'; 
    } 
    return errors;
};

const styles = theme => ({
    qrCode: {
        textAlign: 'center'
    }
});


export default compose(
    withMobileDialog(),
    withStyles(styles),
    reduxForm({
        form: 'enable2fa',
        validate
    }),
    connect(null, actions)
)(PasswordModal);