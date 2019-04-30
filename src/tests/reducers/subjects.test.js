import subjectsReducer from '../../reducers/subjects';
import subjects from '../fixtures/subjects';

test('Should return the state that were passing when calling the reducer', () => {
    const state = subjectsReducer(subjects, {type: '@@INIT'});
    expect(state).toEqual(subjects);
});

test('Should add a subject', ()=> {
    const action = {
        type: 'ADD_SUBJECT',
        subject: subjects[0]
    }

    const state = subjectsReducer([subjects[1]], action);

    expect(state).toEqual([subjects[1], subjects[0]])
});