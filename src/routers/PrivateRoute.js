import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest
    }) => (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div>
                    <Header />
                    <Component {...props} />
                </div>
            ) : (
                <Redirect to="/" />
            )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);

/*
    NOTES:

    component props. Analyze the following lines

    <Route path="/randPage" component={HomeButton}

    const HomeButton = (props) => {
        return (
            <button onClick={ () => props.history.push('/')}> 
                Go Home
            </button>
        );
    };

    Same as saying:

    <Route path="/randPage" component={ (props) => {
        return (
            <button {...props} onClick={ () => props.history.push('/')}> 
                Go Home
            </button>
        );
    } }

    See that what is passed inside component={} is basically a callBack function (or object with constructor)
    And the CB function gets the props arguments passed down by default
    That is why in the PrivateRoute code we must provide the {...props} and the reason why we can 
    get them, is because they are passed down automatically to any CB function.

*/