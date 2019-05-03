import { addSubject, startAddSubject, setSubjects, startSetSubjects } from '../../actions/subjects';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import subjects from '../fixtures/subjects';

const createStore = configureStore([thunk]);
const authDefault = { auth: { uid: '123abc' } };
const uid = '123abc';

beforeEach((done) => {
    const subjectObj = {};

    subjects.forEach(({value, text, id}) => {
        subjectObj[id] = {value, text};
    });

    database.ref(`users/${uid}/subjects`).set(subjectObj);
    done();
});

test('Should dispatch addSubject action and save new subject onto database', (done) => {
    const store = createStore(authDefault);
    const subject = {
        text: 'JS and Redux',
        value: 'js_and_redux'
    };

    store.dispatch(startAddSubject(subject)).then(() =>{
        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: 'ADD_SUBJECT',
            subject: {
                ...subject,
                id: actions[0].subject.id
            } 
        });

        return database.ref(`users/${uid}/subjects/${actions[0].subject.id}`).once('value');
    }).then(dataSnapshot => {
        const subjectDB = dataSnapshot.val();
        expect(subjectDB).toEqual({
            ...subject
        })
        done();
    });
});

test('Should return addSubject object with parsed subject object', () => {
    const subject = {
        text: 'React Redux',
        value: 'react_redux'
    };
    const id = '123abc'
    const action = addSubject({ id, subject });

    expect(action).toEqual({
        type: 'ADD_SUBJECT',
        subject: {
            ...subject,
            id
        }
    });
});

test('Should dispatch setSubjects action and add subject to store', (done) => {
    const store = createStore(authDefault);

    store.dispatch(startSetSubjects()).then(() =>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_SUBJECTS',
            subjects
        });

        return database.ref(`users/${uid}/subjects`).once('value');
    }).then(dataSnapshot => {
        const subjectsDB = []
        
        dataSnapshot.forEach(childSnapshot => {
            subjectsDB.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            })
        });
        expect(subjectsDB).toEqual([...subjects]);
        done();
    });
});

test('Should return setSubjects object', () => {

    const action = setSubjects(subjects);

    expect(action).toEqual({
        type: 'SET_SUBJECTS',
        subjects
    });
});