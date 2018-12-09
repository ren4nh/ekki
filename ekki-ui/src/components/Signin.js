import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader, Button, Grid, withStyles, CircularProgress, Typography } from '@material-ui/core';
import * as actions from '../actions';
import customInput from '../components/custom/customInput';

class Signin extends Component {

    componentDidMount() {
        if(this.props.auth) {
            this.props.history.push('/dashboard');
        }
    }

    onSubmit = (formProps) => {
        this.props.signin(formProps);
    }

    render() {
        const { handleSubmit, classes, isFetching } = this.props
        
        return(
            <Grid container justify='center'>
                <Grid item sm={11} md={4} xs={11}>
                    <Card className={classes.card}>
                        <CardHeader title="Realize o Login" className={classes.cardHeader} />
                        <CardContent>
                            <form onSubmit={handleSubmit(this.onSubmit)}>
                                <Field name="username" label="Email" component={customInput} />
                                <Field name="password" label="Senha" type="password" component={customInput} />
                                <br />
                                <div className={classes.wrapper}>
                                    <Button color="primary" variant="contained" type="submit" disabled={isFetching} fullWidth={true}> Entrar </Button>
                                    {isFetching && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </div>
                            </form>
                            <br />
                            <div className={classes.cardHeader}>
                                <Typography gutterBottom > Esqueceu sua senha? <a href="/forgotPassword"> <strong> Clique aqui </strong> </a> que ajudaremos a recuperar-la</Typography>
                            </div>
                            <hr />
                            <br />
                            <div className={classes.wrapper}>
                                <Button color="primary" variant="contained" type="button" fullWidth={true} href={"/register"}> Registre-se </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

const styles = theme => ({
    cardHeader: {
        textAlign: 'center'
    },
    card: {
        marginTop: '100px'
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
});

const validate = values => {
    const errors = {};
    if(!values.username) {
        errors.username = 'Email deve ser informado!'
    } 
    if(!values.password) {
        errors.password = 'Senha deve ser informada!'
    }
    return errors;
};

function mapStateToProps(state) {
    return {
        auth: state.auth.authenticated,
        isFetching: state.auth.isFetching };
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, actions),
    reduxForm({
        form: 'signin',
        validate })
)(Signin);