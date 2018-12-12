import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FaceIcon from '@material-ui/icons/Face';
import SwapIcon from '@material-ui/icons/SwapHoriz';
import PaymentIcon from '@material-ui/icons/Payment';
import HistoryIcon from '@material-ui/icons/History';
import ExitIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    overflowX: 'auto'
  }
});

class ResponsiveDrawer extends Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  closeDrawer = () => {
    this.setState(state => ({ mobileOpen: false }));
  };

  render() {
    const { classes, theme, children } = this.props;

    const drawer = (
      <Fragment>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button component={Link} to="/dashboard" onClick={this.closeDrawer}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={'Inicio'} />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/favorites" onClick={this.closeDrawer}>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary={'Favorecidos'} />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/transfer" onClick={this.closeDrawer}>
            <ListItemIcon>
              <SwapIcon />
            </ListItemIcon>
            <ListItemText primary={'Transferencia'} />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/card" onClick={this.closeDrawer}>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary={'Cartões'} />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/history" onClick={this.closeDrawer}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary={'Histórico'} />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/logout">
            <ListItemIcon>
              <ExitIcon />
            </ListItemIcon>
            <ListItemText primary={'Sair'} />
          </ListItem>
          <Divider />
        </List>
      </Fragment>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Ekki
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
