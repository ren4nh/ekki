import React, { Component, Fragment } from "react";
import {
  Grid,
  withStyles,
  Button,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  FormControl
} from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import MUIDataTable from "mui-datatables";
import customInput from "./custom/customInput";
import * as actions from "../actions";
import requireAuth from "./requireAuth";
import numberNormalizer from "../utils/numberNormalizer";
import dateNormalizer from "../utils/dateNormalizer";

class CreditCard extends Component {
  componentDidMount() {
    this.props.getAllCards();
  }

  onSubmit = formProps => {
    if (formProps.id) {
      this.props.updateCreditCard(formProps);
    } else {
      this.props.createCreditCard(formProps);
    }
  };

  onDelete = id => {
    this.props.deleteCreditCard(id);
  };

  onLoad = data => {
    const card = {
      id: data[0],
      description: data[1],
      cardNumber: data[2],
      cardName: data[3],
      expiredAt: data[4],
      securityCode: data[5]
    };

    this.props.loadCreditCard(card);
  };

  render() {
    const { cards, classes, handleSubmit, isFetching } = this.props;

    const options = {
      selectableRows: false,
      rowsPerPage: 20,
      responsive: "scroll",
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
              {" "}
              Editar{" "}
            </Button>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              color="primary"
              variant="contained"
              type="button"
              className={classes.button}
              onClick={() => {
                this.onLoad(tableMeta.rowData);
              }}
            >
              {" "}
              Deletar{" "}
            </Button>
          </FormControl>
        </Fragment>
      );
    };

    const actions = {
      name: "Ações",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Fragment>
              {renderButton(tableMeta.rowData[4], value, tableMeta)}
            </Fragment>
          );
        },
        filter: false,
        sort: false
      }
    };

    const columns = [
      "#",
      "Descrição",
      "Numero",
      "Nome",
      "Vencimento",
      "Cód. Segurança",
      actions
    ];

    let data = [];
    cards.map(p => {
      return data.push([
        p.id,
        p.description,
        p.user.username,
        p.user.name,
        p.description,
        p.id
      ]);
    });

    return (
      <Grid
        container
        justify="space-evenly"
        alignItems="stretch"
        direction="column"
        sm={10}
        xs={6}
      >
        <Grid item className={classes.grid}>
          <Card className={classes.card}>
            <CardHeader
              title="Cartão de Crédito"
              className={classes.cardHeader}
            />
            <CardContent>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field
                  name="cardNumber"
                  label="Numero do cartão"
                  component={customInput}
                  normalize={numberNormalizer}
                  inputProps={{ maxLength: 16 }}
                />
                <Field
                  name="cardName"
                  label="Nome do titular (Nome impresso no cartão)"
                  component={customInput}
                />
                <Field
                  name="expiredAt"
                  label="Data de vencimento (Mês/Ano)"
                  component={customInput}
                  normalize={dateNormalizer}
                />
                <Field
                  name="securityCode"
                  label="Código de segurança"
                  component={customInput}
                  normalize={numberNormalizer}
                  inputProps={{ maxLength: 3 }}
                />
                <Field
                  name="description"
                  label="Descrição"
                  component={customInput}
                />
                <br />
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isFetching}
                    fullWidth={true}
                  >
                    {" "}
                    Salvar{" "}
                  </Button>
                  {isFetching && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item className={classes.grid}>
          <div className={classes.table}>
            <MUIDataTable
              title={"Meus cartões"}
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
    textAlign: "center"
  },
  card: {
    marginTop: "20px"
  },
  formControl: {
    margin: theme.spacing.unit
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  }
});

const validate = values => {
  const errors = {};
  if (!values.description) {
    errors.description = "Descrição deve ser informado";
  } else if (values.description.trim().length <= 0) {
    errors.description = "Descrição deve ser informado";
  }
  if (!values.cardNumber) {
    errors.cardNumber = "Numero do cartão deve ser informado";
  } else if (isNaN(Number(values.cardNumber))) {
    errors.cardNumber = "Apenas numeros são aceitos";
  }
  if (!values.securityCode) {
    errors.securityCode = "Código de segurança deve ser informado";
  } else if (isNaN(Number(values.securityCode))) {
    errors.securityCode = "Apenas numeros são aceitos";
  }
  if (!values.expiredAt) {
    errors.expiredAt = "Data de vencimento deve ser informada";
  } else if (values.expiredAt.trim().length <= 0) {
    errors.expiredAt = "Data de vencimento deve ser informada";
  }
  if (!values.cardName) {
    errors.cardName = "Nome do titular deve ser informado";
  } else if (values.cardName.trim().length <= 0) {
    errors.cardName = "Nome do titular deve ser informado";
  }
  return errors;
};

function mapStateToProps(state) {
  return {
    cards: state.card.cards,
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
    form: "creditCardForm",
    enableReinitialize: true,
    validate
  })
)(requireAuth(CreditCard));
