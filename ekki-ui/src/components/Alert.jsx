import React , { Component } from 'react';
import { Snackbar } from '@material-ui/core';
import { connect } from 'react-redux';
import MySnackbarContent from './custom/MySnackbarContent';
import * as actions from '../actions';

class Alert extends Component {

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.props.closeMessage();
    };

    render() {
        const { type, message, open } = this.props
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={this.handleClose}
            >
            <MySnackbarContent
                onClose={this.handleClose}
                variant={type}
                message={message}
            />
          </Snackbar>
        );
    }
}

function mapStateToProps(state) {
    return { type: state.alert.type, message: state.alert.message, open: state.alert.open };
}

export default connect(mapStateToProps, actions)(Alert);