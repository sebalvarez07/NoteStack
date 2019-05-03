import { addNote, editNote, removeNote, setNotes, startAddNote, startEditNote, startRemoveNote, startSetNotes } from '../../actions/notes';
import notes from '../fixtures/notes';
import moment from 'moment';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createStore = configureStore([thunk]);
const authSetup = { auth: { uid: '123abc'} };

beforeEach((done) => {
      
    const notesObj  = {};

    notes.forEach(({id, title, content, dateCreated, rawData, textContent, subject}) => {
        notesObj[id] = {title, content, dateCreated, rawData: JSON.stringify(rawData), textContent, subject};
    });

    database.ref(`users/${authSetup.auth.uid}/notes`).set(notesObj).then(() => done());
})

test('Should start and dispatch addNote action and add note to DB', (done) => {

    const store = createStore(authSetup);
    const uid = store.getState().auth.uid;

    const defaultNote = {
        title: '',
        content: '', 
        dateCreated: moment().valueOf(), 
        rawData: {},
        textContent: '',
        subject: 'no_subject'
    };

    store.dispatch(startAddNote(defaultNote)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_NOTE',
            note: {
                ...defaultNote,
                id: actions[0].note.id
            }
        });

        return database.ref(`users/${uid}/notes/${actions[0].note.id}`).once('value');

    }).then((dataSnapshot) => {

        const noteVal = dataSnapshot.val();
        noteVal.rawData = JSON.parse(noteVal.rawData);
        
        expect(noteVal).toEqual({
            ...defaultNote
        });
        done();
    });
});

test('Should return addNote action with default note values', () => {
 
    const defaultNote = {
        title: '',
        content: '', 
        dateCreated: moment().valueOf(), 
        rawData: {},
        textContent: '',
        subject: 'no_subject'
    }

    const action = addNote(defaultNote);
    expect(action).toEqual({
        type: 'ADD_NOTE',
        note: {
            ...defaultNote
        }
    });
});

test('Should start and dispatch editNote action and edit note on DB', (done) => {

    const store = createStore(authSetup);
    const uid = store.getState().auth.uid;

    const updates = {
        title: 'Title Edited',
        rawData: {
            rawData: 'Filler Edited'
        }
    };

    const id = notes[0].id;

    const note = {
        textContent: notes[0].textContent,
        title: notes[0].title,
        content: notes[0].content,
        dateCreated: notes[0].dateCreated,
        rawData: notes[0].rawData,
        subject: notes[0].subject
    };

    store.dispatch(startEditNote(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_NOTE',
            id,
            updates
        });

        return database.ref(`users/${uid}/notes/${actions[0].id}`).once('value');

    }).then((dataSnapshot) => {

        const noteVal = dataSnapshot.val();
        noteVal.rawData = JSON.parse(noteVal.rawData);
        
        expect(noteVal).toEqual({
            ...note,
            ...updates
        });
        done();
    });
});


test('Should return action for edit note', () => {
    const updates = { title: 'Hello' }
    const id = '123abc';
    const action = editNote(id, updates);

    expect(action).toEqual({
        type: 'EDIT_NOTE',
        id,
        updates
    })
});

test('Should start and dispatch removeNote action and remove it note from DB', (done) => {

    const store = createStore(authSetup);
    const uid = store.getState().auth.uid;

    const id = notes[0].id;

    store.dispatch(startRemoveNote(id)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_NOTE',
            id
        });

        return database.ref(`users/${uid}/notes/${actions[0].id}`).once('value');

    }).then((dataSnapshot) => {

        const noteVal = dataSnapshot.val();
        
        expect(noteVal).toBeFalsy();
        done();
    });
});

test('Should return action for remove note', () => {
    const id = '123abc';
    const action = removeNote(id);

    expect(action).toEqual({
        type: 'REMOVE_NOTE',
        id
    })
});

test('Should dispatch setNotes and read notes from DB to local store', (done) => {
    const store = createStore(authSetup);
    const uid = store.getState().auth.uid;

    store.dispatch(startSetNotes()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_NOTES',
            notes
        });

        return database.ref(`users/${uid}/notes`).once('value');
    }).then(dataSnapshot => {
        const notesRead = [];

        dataSnapshot.forEach(childSnapshot => {
            const id = childSnapshot.key;
            const noteAtr = childSnapshot.val();
            noteAtr.rawData = JSON.parse(noteAtr.rawData);
            notesRead.push({
                id,
                ...noteAtr
            })
        });

        expect(notesRead).toEqual(notes);
        done();
    });
})

test('Should return action to set notes', () => {

    const action = setNotes(notes);
    expect(action).toEqual({
        type: 'SET_NOTES',
        notes
    })

})