import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import DashboardPage from '../components/DashboardPage';
import AddNote from '../components/AddNote';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage  from '../components/LoginPage';
import ViewNote  from '../components/ViewNote';
import EditNote  from '../components/EditNote';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <Switch> 
            <PublicRoute path="/" exact={true} component={LoginPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/addNote" component={AddNote} />
            <PrivateRoute path="/view/:id" component={ViewNote} />
            <PrivateRoute path="/edit/:id" component={EditNote} />
            <Route component={NotFoundPage} />
        </Switch>
    </Router>
);

export default AppRouter;