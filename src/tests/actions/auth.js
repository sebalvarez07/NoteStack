import { login, startLoginIn, logout, startLoginOut } from '../../actions/auth';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { firebase } from './firebase/firebase';

const createMockStore = configureStore([thunk]);

test('Should test login action', () => {
    const uid = '123abc';
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

test('Should test logout action', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT',
    });
});