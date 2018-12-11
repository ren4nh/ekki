import React, { Component, Fragment } from 'react';
import {
  Grid,
  withStyles,
  Button,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  FormControl,
  Typography
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import MUIDataTable from 'mui-datatables';
import customInput from './custom/customInput';
import customSelect from './custom/customSelect';
import * as actions from '../actions';
import requireAuth from './requireAuth';
import PasswordModal from './PasswordModal';
import asyncValidate from '../utils/asyncValidate';

class Transfer extends Component {
  state = {
    usingCreditCard: false,
    showModal: false
  };

  componentDidMount() {
    this.props.getAllCards();
    this.props.getAllFavorites();
    this.props.setUser();
  }

  onSubmit = formProps => {
    if (formProps.amount > 1000) {
      this.toggleModal();
    } else {
      this.submitForm();
    }
  };

  submitForm = () => {
    const { formValues } = this.props;
    console.log(formValues);
    this.props.createTransaction(formValues);
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  verifyCompleteAmount = value => {
    if (value > this.props.user.balance) {
      this.setState({ usingCreditCard: true });
    } else {
      this.setState({ usingCreditCard: false });
    }
  };

  onLoad = data => {
    this.props.loadDestination(data[1]);
  };

  render() {
    const { favorites, creditCards, user, classes, handleSubmit, isFetching } = this.props;

    const { usingCreditCard } = this.state;

    const options = {
      selectableRows: false,
      rowsPerPage: 20,
      responsive: 'scroll',
      rowsPerPageOptions: [10, 20, 50]
    };

    const renderButton = (type, value, tableMeta) => {
      return (
        <Fragment>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              type="button"
              className={classes.button}
              onClick={() => {
                this.onLoad(tableMeta.rowData);
              }}
            >
              Selecionar
            </Button>
          </FormControl>
        </Fragment>
      );
    };

    const actions = {
      name: 'Ações',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Fragment>{renderButton(tableMeta.rowData[4], value, tableMeta)}</Fragment>;
        },
        filter: false,
        sort: false
      }
    };

    const columns = ['#', 'Email', 'Nome', 'Descrição', actions];

    let data = [];
    favorites.map(p => {
      return data.push([p.id, p.favorite.username, p.favorite.name, p.description, p.id]);
    });

    let selectValues = [];
    creditCards.map(p => {
      return selectValues.push({ value: p.id, input: p.description });
    });

    return (
      <Grid container justify="space-evenly" alignItems="stretch" direction="column">
        <Grid item className={classes.grid} sm={10} xs={6}>
          <Card className={classes.card}>
            <CardHeader title="Transferencia" className={classes.cardHeader} />
            <CardContent>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field
                  name="destination"
                  label="Destinatário (email do usuário)"
                  component={customInput}
                />
                <Field
                  name="amount"
                  label="Valor"
                  component={customInput}
                  type="number"
                  onBlur={this.verifyCompleteAmount}
                />
                <Field
                  name="creditCard"
                  label="Cartão de crédito"
                  component={customSelect}
                  values={selectValues}
                  disabled={usingCreditCard}
                />
                <Typography gutterBottom>
                  <strong> Saldo atual: </strong> R$ {user.balance}
                </Typography>
                {usingCreditCard && (
                  <Typography gutterBottom>
                    <strong>Será utilizado o cartão de crédito para completar a transação </strong>
                  </Typography>
                )}
                <br />
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isFetching}
                    fullWidth={true}
                  >
                    Enviar
                  </Button>
                  {isFetching && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              </form>
            </CardContent>
          </Card>
          {this.state.showModal && (
            <PasswordModal toogle={this.toggleModal} callback={this.submitForm} />
          )}
        </Grid>
        <Grid item className={classes.grid} sm={10} xs={6}>
          <div className={classes.table}>
            <MUIDataTable
              title={'Meus favorecidos'}
              data={data}
              columns={columns}
              options={options}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  table: {
    marginTop: theme.spacing.unit * 3
  },
  cardHeader: {
    textAlign: 'center'
  },
  card: {
    marginTop: '20px'
  },
  formControl: {
    margin: theme.spacing.unit
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  }
});

const validate = (values, { user }) => {
  const errors = {};
  if (!values.destination) {
    errors.destination = 'Destinatário deve ser informado!';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.destination)) {
    errors.destination = 'Destinatário inválido';
  }
  if (!values.amount) {
    errors.amount = 'Valor deve ser informado';
  } else if (values.amount <= 0) {
    errors.amount = 'Valor deve ser maior que 0';
  }
  if (values.amount > user.balance) {
    if (!values.creditCard) {
      errors.creditCard =
        'Valor maior que seu saldo atual, para completar a transação selecione ou cadastre um cartão de crédito no menu Cartões';
    }
  }
  return errors;
};

function mapStateToProps(state) {
  const selector = formValueSelector('transferForm');
  return {
    user: state.user.user,
    creditCards: state.card.cards,
    favorites: state.favorite.favorites,
    isFetching: state.auth.isFetching,
    initialValues: {
      destination: state.transaction.destination
    },
    formValues: selector(state, 'amount', 'destination', 'creditCard')
  };
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({
    form: 'transferForm',
    enableReinitialize: true,
    validate,
    asyncValidate,
    asyncBlurFields: ['destination']
  })
)(requireAuth(Transfer));
