import { setText, setToLatest, setToEarliest, setSubject } from '../../actions/filters';

test('Should return setText action object with text', ()=>{
    const text = '123abc';
    const action = setText(text);
    expect(action).toEqual({
        type: 'SET_TEXT',
        text
    });
});

test('Should return setToLatest object', () => {
    const action = setToLatest();
    expect(action).toEqual({
        type: 'SET_LATEST'
    });
});

test('Should return setToEarliest object', () => {
    const action = setToEarliest();
    expect(action).toEqual({
        type: 'SET_EARLIEST'
    });
});

test('Should return the setSubject object with appropriate subject text', () => {
    const subject = 'react';
    const action = setSubject(subject);
    expect(action).toEqual({
        type: 'SET_SUBJECT',
        subject
    })
});