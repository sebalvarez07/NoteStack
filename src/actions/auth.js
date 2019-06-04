import { firebase, googleAuthProvider, FacebookAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});
 
export const googleStartLoginIn = () => {
    return dispatch => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const facebookStartLoginIn = () => {
    return dispatch => {
        return firebase.auth().signInWithPopup(FacebookAuthProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLoginOut = () => {
    return dispatch => {
        return firebase.auth().signOut();
    };
};