import database from '../firebase/firebase';

export const addSubject = ({ id, subject }) => ({
    type: 'ADD_SUBJECT',
    subject: {
        ...subject,
        id
    }
});

export const startAddSubject = (subject) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/subjects`).push(subject).then(ref => {
            dispatch(addSubject({
                id: ref.key,
                subject
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
                subjects.push({
                    ...childSnapshot.val(),
                    id: childSnapshot.key
                })
            });

            dispatch(setSubjects(subjects));
        });
    }
}