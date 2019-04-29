import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import 'draft-js/dist/Draft.css';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';


const store = configureStore();

/*
    Provider lets us define a store that we want to provide to all of our components inside AppRouter
*/
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// Render once control boolean
let hasRendered = false;

// Should happen only once, as render doesn't need to be constantly called
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

// Render loading screen
ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// Redirection functionality --> This triggers on load, as firebase dispatches the current state on load. See redux tools to see this happening live.
firebase.auth().onAuthStateChanged((user) => {
    if(user){

        store.dispatch(login(user.uid));
        renderApp();
        // If user is on the login page redirect to dashboard. 
        // If user is on another page it means they are not logged in so redirects to login
        if(history.location.pathname === '/'){
            history.push('/dashboard');
        }
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});