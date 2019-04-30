import { addSubject } from '../../actions/subjects';

test('Should return addSubject object with parsed subject object', () => {
    const subject = 'React Redux'
    const action = addSubject(subject);

    expect(action).toEqual({
        type: 'ADD_SUBJECT',
        subject: {
            value: subject.replace(' ', '_').toLowerCase(),
            text: subject
        }
    });
});