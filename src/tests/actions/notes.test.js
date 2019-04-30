import { addNote, editNote, removeNote } from '../../actions/notes';
import notes from '../fixtures/notes';
import moment from 'moment';

test('Should return action with default note values', () => {

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
            ...defaultNote,
            id: expect.any(String)
        }
    });
});

test('Should return action with note values', () => {

    const action = addNote(notes[0]);
    expect(action).toEqual({
        type: 'ADD_NOTE',
        note: {
            ...notes[0],
            id: expect.any(String)
        }
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

test('Should return action for remove note', () => {
    const id = '123abc';
    const action = removeNote(id);

    expect(action).toEqual({
        type: 'REMOVE_NOTE',
        id
    })
});