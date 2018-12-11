import React, { Component } from "react";
import {
  Grid,
  withStyles,
  Typography
} from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";
import { reduxForm } from "redux-form";
import requireAuth from "./requireAuth";

class Dashboard extends Component {
  componentDidMount() {
    this.props.setUser();
  }

  render() {
    const { classes, user } = this.props;

    return (
      <Grid container justify="space-evenly">
        <Typography gutterBottom variant={"h4"} className={classes.card}>
          Bem vindo {user && user.name}{" "}, seu saldo em conta é de R$ {user.balance}
        </Typography>
      </Grid>
    );
  }
}

const styles = theme => ({
  card: {
    marginTop: "20px"
  }
});

function mapStateToProps(state) {
  return {
    user: state.user.user,
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
    form: "dashboardForm",
    enableReinitialize: true
  })
)(requireAuth(Dashboard));