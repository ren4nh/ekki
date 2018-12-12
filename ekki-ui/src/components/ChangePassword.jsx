import React, { Component } from 'react';
import { reduxForm, Field, change } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader, Grid, withStyles, Button } from '@material-ui/core';
import * as actions from '../actions';
import customInput from '../components/custom/customInput';
import qs from 'qs';

class ChangePassword extends Component {
  componentDidMount() {
    const query = qs.parse(this.props.location.search.slice(1));
    if (!query.token) {
      this.props.history.push('/login');
      return;
    }
    this.props.dispatch(change('changePassword', 'username', query.email));
  }

  onSubmit = formProps => {
    const query = qs.parse(this.props.location.search.slice(1));
    formProps = { ...formProps, token: query.token };
    this.props.changePassword(formProps);
  };

  render() {
    const { handleSubmit, classes } = this.props;

    return (
      <Grid container justify="center">
        <Grid item>
          <Card className={classes.card}>
            <CardHeader title="Troca de senha" className={classes.cardHeader} />
            <CardContent>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field
                  name="username"
                  label="Email"
                  type="email"
                  disabled
                  component={customInput}
                />
                <Field name="password" label="Nova senha" type="password" component={customInput} />
                <Field
                  name="confirmPassword"
                  label="Confirme sua senha"
                  type="password"
                  component={customInput}
                />
                <br />
                <Button color="primary" variant="contained" type="submit" fullWidth={true}>
                  Salvar
                </Button>
              </form>
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
  if (!values.username) {
    errors.username = 'Email deve ser informado!';
  }
  if (!values.password) {
    errors.password = 'Senha deve ser informada!';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirme sua senha';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'As senha devem ser iguais';
  }
  return errors;
};

export default compose(
  withStyles(styles),
  connect(
    null,
    actions
  ),
  reduxForm({
    form: 'changePassword',
    validate
  })
)(ChangePassword);
