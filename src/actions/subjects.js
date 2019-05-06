import database from '../firebase/firebase';

export const addSubject = (subject) => ({
    type: 'ADD_SUBJECT',
    subject
});

export const setSubjects = (subjects) => ({
    type: 'SET_SUBJECTS',
    subjects
})

export const startSetSubjects = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/notes`).once('value').then(dataSnapshot => {
            const subjects = [];

            dataSnapshot.forEach(childSnapshot => {

                const currentSubject = childSnapshot.val().subject;

                // If undefined is returned (currentSubject isn't in the subject arr). We push subject
                if(!(!!subjects.find(sub => sub.value === currentSubject.value))){
                    subjects.push({ ...currentSubject });
                }
            });

            dispatch(setSubjects(subjects));
        });
    }
}