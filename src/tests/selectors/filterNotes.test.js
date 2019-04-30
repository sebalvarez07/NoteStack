import filterNotes from '../../selectors/filterNotes';
import notes from '../fixtures/notes';

test('Should return all notes organized by latest modified/created', () => {

    const filter = {
        text: '',
        sortBy: 'latest',
        subject: 'all_subjects'
    };

    const notesFiltered = filterNotes(notes, filter)
    expect(notesFiltered).toEqual([ notes[1], notes[0], notes[2] ]);
});

test('Should return all notes organized by earliest modified/created', () => {

    const filter = {
        text: '',
        sortBy: 'earliest',
        subject: 'all_subjects'
    };

    const notesFiltered = filterNotes(notes, filter)
    expect(notesFiltered).toEqual([ notes[2], notes[0], notes[1] ]);
});

test('Should return notes filtered by text', () => {

    const filter = {
        text: '1',
        sortBy: 'latest',
        subject: 'all_subjects'
    };

    const notesFiltered = filterNotes(notes, filter)
    expect(notesFiltered).toEqual([ notes[0] ]);
});

test('Should return notes filtered by subject', () => {

    const filter = {
        text: '',
        sortBy: 'latest',
        subject: 'react'
    };

    const notesFiltered = filterNotes(notes, filter)
    expect(notesFiltered).toEqual([ notes[1] ]);
});