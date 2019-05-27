import moment from 'moment';
import database from '../firebase/firebase';

export const addNote = (note) => {
    return {
        type: 'ADD_NOTE',
        note 
    }
};

export const startAddNote = ({
        title = '',
        dateCreated = moment().valueOf(), 
        rawData = '',
        textContent = '',
        subject = '',
        isFavourite = false
    } = {}
    ) => {
    return (dispatch, getState) => {

        const rawDataJSON = JSON.stringify(rawData);

        const uid = getState().auth.uid;
        const noteParsed = {title, dateCreated, rawData: rawDataJSON, textContent, subject, isFavourite}

        return database.ref(`users/${uid}/notes`).push(noteParsed).then((ref) => {
            dispatch(addNote({
                // the key is the last part of the reference's path
                id: ref.key,
                ...noteParsed,
                rawData
            }));

            return ref.key
        });
    }
};

export const editNote = (id, updates) => ({
    type: 'EDIT_NOTE',
    id,
    updates
});

export const startEditNote = (id, updates) => {
    return (dispatch, getState) => {

        const uid = getState().auth.uid;

        // If note is edited from the editor
        if(!!updates.rawData){
            const rawDataJSON = JSON.stringify(updates.rawData);

            return database.ref(`users/${uid}/notes/${id}`).update({
                ...updates,
                rawData: rawDataJSON
            })
            .then(()=> {
                dispatch(editNote(id, updates));
            });
        }
        else {
            // If favourte status is updated (rather than creating a whole action)
            return database.ref(`users/${uid}/notes/${id}`).update({
                ...updates,
            })
            .then(()=> {
                dispatch(editNote(id, updates));
            });
        }
    };
};

export const removeNote = (id) => ({
    type: 'REMOVE_NOTE',
    id
});

export const startRemoveNote = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/notes/${id}`).remove().then(()=>{
            dispatch(removeNote(id));
        });
    };  
};

export const setNotes = (notes) => ({
    type: 'SET_NOTES',
    notes
});

export const startSetNotes = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        
        return database.ref(`users/${uid}/notes`).once('value').then((snapshot)=>{
            const notes = [];

            snapshot.forEach(childSnapshot => {

                const value = childSnapshot.val();
                const id = childSnapshot.key;
                const rawData = JSON.parse(value.rawData);

                // console.log('RawData', rawData);

                notes.push({
                    id,
                    ...value,
                    rawData
                });
            });

            dispatch(setNotes(notes));
        });
    };
};