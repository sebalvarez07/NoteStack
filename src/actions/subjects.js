export const addSubject = (subject) => ({
    type: 'ADD_SUBJECT',
    subject: {
        value: subject.replace(' ', '_').toLowerCase(),
        text: subject
    }
});