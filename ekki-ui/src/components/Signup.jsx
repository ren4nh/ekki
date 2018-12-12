import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  withStyles,
  Typography
} from '@material-ui/core';
import * as actions from '../actions';
import customInput from './custom/customInput';

class Signup extends Component {
  componentDidMount() {
    if (this.props.auth) {
      this.props.history.push('/dashboard');
    }
  }

  onSubmit = formProps => {
    this.props.signup(formProps);
  };

  render() {
    const { handleSubmit, classes } = this.props;

    return (
      <Grid container justify="center">
        <Grid item>
          <Card className={classes.card}>
            <CardHeader title="Registre-se" className={classes.cardHeader} />
            <CardContent>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field name="name" label="Nome" component={customInput} />
                <Field name="username" label="Email" type="email" component={customInput} />
                <Field name="password" label="Senha" type="password" component={customInput} />
                <Field
                  name="confirmPassword"
                  label="Confirme sua senha"
                  type="password"
                  component={customInput}
                />
                <br />
                <Button color="primary" variant="contained" type="submit" fullWidth={true}>
                  Registrar
                </Button>
              </form>
              <br />
              <div className={classes.cardHeader}>
                <Typography gutterBottom>
                  Já possui conta?
                  <a href="/login">
                    <strong> Clique aqui </strong>
                  </a>
                  para realizar login
                </Typography>
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
  }
});

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Nome deve ser informado!';
  }
  if (!values.username) {
    errors.username = 'Email deve ser informado!';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
    errors.username = 'Email inválido';
  }
  if (!values.password) {
    errors.password = 'Senha deve ser informada!';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirme sua senha!';
  } else {
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Senhas devem ser iguais!';
    }
  }
  return errors;
};

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    authority: state.auth.authority,
    isFetching: state.auth.isFetching
  };
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({
    form: 'signup',
    validate
  })
)(Signup);
