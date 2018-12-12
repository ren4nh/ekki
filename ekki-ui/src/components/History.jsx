import React, { Component } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import * as actions from '../actions';
import requireAuth from './requireAuth';

class History extends Component {
  componentDidMount() {
    this.props.setTransactions();
  }

  render() {
    const { transactions, classes } = this.props;

    const options = {
      selectableRows: false,
      rowsPerPage: 20,
      responsive: 'scroll',
      rowsPerPageOptions: [10, 20, 50]
    };

    const columns = ['#', 'Favorecido', 'Data', 'Valor', 'Status'];

    const data = [];
    transactions.map(p =>
      data.push([p.id, p.destination.username, p.createdAt, p.amount, p.status])
    );

    return (
      <Grid container justify="space-evenly" alignItems="stretch" direction="column">
        <Grid item className={classes.grid}>
          <div className={classes.table}>
            <MUIDataTable title="Meu histórico" data={data} columns={columns} options={options} />
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

function mapStateToProps(state) {
  return {
    transactions: state.user.transactions,
    isFetching: state.auth.isFetching
  };
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    actions
  )
)(requireAuth(History));
