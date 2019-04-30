import database from '../firebase/firebase';

export const addSubject = (subject) => ({
    type: 'ADD_SUBJECT',
    subject
});

export const startAddSubject = (subject) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/subjects`).push(subject).then(ref => {
            dispatch(addSubject({
                id: ref.key,
                ...subject
            }));
        });
    };
};

export const setSubjects = (subjects) => ({
    type: 'SET_SUBJECTS',
    subjects
})

export const startSetSubjects = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/subjects`).once('value').then(dataSnapshot => {
            const subjects = [];
            dataSnapshot.forEach(childSnapshot => {
                subjects.push(childSnapshot.val())
            });

            dispatch(setSubjects(subjects));
        });
    }
}