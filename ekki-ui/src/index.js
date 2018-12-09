import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import App from './components/App';

import configureStore from './configStore';
import history from './history';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import Signout from './components/Signout';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './components/ForgotPassword';
import Signup from './components/Signup';
import Favorites from './components/Favorites';
import CreditCard from './components/CreditCard';
import History from './components/History';
import Transfer from './components/Transfer';

const { store } = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history} >
            <App>
                <Switch>
                    <Route exact path="/" component={Signin} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/login" component={Signin} />
                    <Route exact path="/logout" component={Signout} />
                    <Route exact path="/forgotPassword" component={ForgotPassword} />
                    <Route exact path="/changePassword" component={ChangePassword} />
                    <Route exact path="/register" component={Signup} />
                    <Route exact path="/favorites" component={Favorites} />
                    <Route exact path="/card" component={CreditCard} />
                    <Route exact path="/history" component={History} />
                    <Route exact path="/transfer" component={Transfer} />
                    <Route path="*" component={() => <h1>Erro 404</h1>} />
                </Switch>
            </App>
        </ConnectedRouter>
    </Provider>, document.querySelector('#root'));