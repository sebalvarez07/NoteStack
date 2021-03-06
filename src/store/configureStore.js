import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import notesReducer from '../reducers/notes';
import filtersReducer from '../reducers/filters';
import collapseStatus from '../reducers/collapseStatus';
import editorStateReducer from '../reducers/editorState';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    // Store creation
    const store = createStore(
        combineReducers({
            auth: authReducer,
            notes: notesReducer,
            filters: filtersReducer,
            collapseStatus: collapseStatus,
            editorState: editorStateReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        // This line of code allows us to use the store chrome extension for dev tools
        // We've removed it as the line above takes care of this
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}

