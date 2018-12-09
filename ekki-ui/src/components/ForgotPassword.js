import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Card, CardContent, CardHeader, Button, Grid, withStyles, Typography } from '@material-ui/core';
import * as actions from '../actions';
import customInput from '../components/custom/customInput';

class ForgotPassword extends Component {

    onSubmit = (formProps) => {
        this.props.forgotPassword(formProps);
    }

    render() {
        const { handleSubmit, classes } = this.props
        
        return (
            <Grid container justify='center'>
                <Grid item sm={11} md={3} xs={11}>
                    <Card className={classes.card}>
                        <CardHeader title="Esqueceu sua senha" className={classes.cardHeader} />
                        <CardContent>
                            <Typography gutterBottom > Para redefinir sua senha informe seu email abaixo </Typography>
                            <form onSubmit={handleSubmit(this.onSubmit)}>
                                <Field name="username" label="Email" component={customInput} />
                                <br />
                                <Button color="primary" variant="contained" type="submit" fullWidth={true}> Redefinir minha senha </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

const styles = theme => ({
    cardHeader: {
        textAlign: 'center'
    },
    card: {
        marginTop: '100px'
    }
});

const validate = values => {
    const errors = {};
    if(!values.username) {
        errors.username = 'Email deve ser informado'
    }
    return errors;
};

function mapStateToProps(state) {
    return {
        authority: state.auth.authority
    }
}

export default compose(
                withStyles(styles),
                connect(mapStateToProps, actions),
                reduxForm({
                    form: 'forgotPassword',
                    validate })           
                )(ForgotPassword);