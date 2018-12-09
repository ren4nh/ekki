import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import logo from '../../img/logo.png';
import { compose } from 'redux';
import { connect } from 'react-redux';

const styles = theme => ({
  left: {
    flexGrow: 1,
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#474243',
  },
  headerLogo: {
    marginTop: 0,
    width: 110,
    height: 40,
  }
});

class MyAppBar extends Component {

  render() {
    const { classes, auth } = this.props;

    if(!auth) return null;

    return (
        <AppBar position="static" className={classes.appBar}>
          <Toolbar disableGutters={true}>
            <div className={classes.left}>
              <Button color="inherit" href='/'>
                <img alt="" src={logo} className={classes.headerLogo}/>
              </Button>
              <Button color="inherit" href='/dashboard'>Inicio</Button>
            </div>
            <Button color="inherit" href='/logout'>Logout</Button>
          </Toolbar>
        </AppBar>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default compose(
                withStyles(styles),
                connect(mapStateToProps)
)(MyAppBar);