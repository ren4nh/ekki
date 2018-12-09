import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export default function ChildComponent(ChildComponent) {
    class ComposedComponent extends Component {

        componentWillMount() {
            this.shouldNavigateAway();
        }
    
        componentDidUpdate() {
            this.shouldNavigateAway();
        }
    
        async shouldNavigateAway() {
            if (!this.props.auth) {
                this.props.history.push("/login");
            }
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
            auth: state.auth.authenticated };
    }

    return connect(mapStateToProps, actions)(ComposedComponent);
};

