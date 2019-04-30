import notesReducer from '../../reducers/notes';
import notes from '../fixtures/notes';

test('Should test default case and return empty array', () => {
    const state = notesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('Should add a note to the array', () => {
    const action = {
        type: 'ADD_NOTE',
        note: notes[1]
    }
    const state = notesReducer([notes[0]], action);

    expect(state).toEqual([notes[0], notes[1]]);
});

test('Should test edit note action with correct id', () => {
    const action = {
        type: 'EDIT_NOTE',
        id: "1",
        updates: {
            title: "Title Edited",
        }
    };

    const state = notesReducer(notes, action);

    expect(state[0]).toEqual({
        ...notes[0],
        ...action.updates
    });
});

test('Should test edit note action with incorrect id', () => {
    const action = {
        type: 'EDIT_NOTE',
        id: "5",
        updates: {
            title: "Title Edited",
        }
    };

    const state = notesReducer(notes, action);

    expect(state).toEqual(notes);
});

test('Should remove notes with correct id', ()=> {

    const action = {
        type: 'REMOVE_NOTE',
        id: "1"
    }

    const state = notesReducer([notes[0], notes[1]], action);

    expect(state).toEqual([notes[1]]);
});

test('Should test remove notes action with incorrect id', ()=> {

    const action = {
        type: 'REMOVE_NOTE',
        id: "5"
    }

    const state = notesReducer([notes[0], notes[1]], action);

    expect(state).toEqual([notes[0], notes[1]]);
});