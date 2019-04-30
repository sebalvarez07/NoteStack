export const setText = (text) => ({
    type: 'SET_TEXT',
    text
});

export const setToLatest = () => ({
    type: 'SET_LATEST'
});

export const setToEarliest = () => ({
    type: 'SET_EARLIEST'
});

export const setSubject = (subject) => ({
    type: 'SET_SUBJECT',
    subject
}); 