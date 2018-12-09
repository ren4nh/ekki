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

class Newsletter extends Component {
  componentDidMount() {}

  onSubmit = formProps => {
    if (formProps.id) {
      this.props.updateNewsletter(formProps);
    } else {
      this.props.createNewsletter(formProps);
    }
  };

  onDelete = id => {
    this.props.deleteNewsletter(id);
  };

  onSend = id => {
    this.props.sendNewsletter(id);
  };

  onCancel = id => {
    this.props.cancelNewsletter(id);
  };

  onLoad = data => {
    const newsletter = {
      id: data[0],
      name: data[1],
      content: data[2],
      type: data[3],
      status: data[4]
    };

    this.props.loadNewsletter(newsletter);
  };

  render() {
    const { favorites, classes, handleSubmit, isFetching } = this.props;

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

    const columns = ["#", "Email", "Nome", "Descrição", actions];

    let data = [];
    favorites.map(p => {
        return data.push([p.id, p.user.username, p.user.name, p.description, p.id]);
      });

    return (
      <Grid container justify="space-evenly" alignItems="stretch" direction="column" sm={10} xs={6} >
        <Grid item className={classes.grid} >
          <Card className={classes.card}>
            <CardHeader title="Favorecido" className={classes.cardHeader} />
            <CardContent>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field name="email" label="Email" component={customInput} />
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
              title={"Meus favorecidos"}
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
  if (!values.email) {
    errors.email = "Email deve ser informado!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email inválido";
  }
  if (!values.description) {
    errors.description = "Descrição deve ser informado";
  } else if (values.description.trim().length <= 0) {
    errors.description = "Descrição deve ser informado";
  }
  return errors;
};

function mapStateToProps(state) {
  let initialValues = {};
  return {
    favorites: state.user.favorites,
    isFetching: state.auth.isFetching,
    initialValues: initialValues
  };
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({
    form: "newsletterForm",
    enableReinitialize: true,
    validate
  })
)(requireAuth(Newsletter));
