import moment from 'moment';
import uuid from 'uuid';
import database from '../firebase/firebase';

export const addNote = (note) => {
    return {
        type: 'ADD_NOTE',
        note
    }
};

export const startAddNote = (note) => {
    
    return (dispatch, getState) => {
        const {
            title = '',
            content = '', 
            dateCreated = moment().valueOf(), 
            rawData = {},
            textContent = '',
            subject = 'no_subject'
        } = note;

        const rawDataJSON = JSON.stringify(rawData);

        const uid = getState().auth.uid;
        const noteParsed = {title, content, dateCreated, rawData: rawDataJSON, textContent, subject}

        return database.ref(`users/${uid}/notes`).push(noteParsed).then((ref) => {
            dispatch(addNote({
                // the key is the last part of the reference's path
                id: ref.key,
                ...noteParsed,
                rawData
            }));
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
        const rawDataJSON = JSON.stringify(updates.rawData);

        return database.ref(`users/${uid}/notes/${id}`).update({
            ...updates,
            rawData: rawDataJSON
        })
        .then(()=> {
            dispatch(editNote(id, updates));
        });
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