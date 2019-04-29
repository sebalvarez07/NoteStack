import moment from 'moment';
import uuid from 'uuid';

export const addNote = ({
            title, 
            content = '', 
            dateCreated = moment().valueOf(), 
            rawData,
            textContent = '',
            subject = 'no_subject'
        } = {}
    ) => {
    return {
        type: 'ADD_NOTE',
        note: {
            id: uuid(),
            textContent,
            title,
            content,
            dateCreated,
            rawData,
            subject
        }
    }
};

export const editNote = (id, updates) => ({
    type: 'EDIT_NOTE',
    id,
    updates
});

export const removeNote = (id) => ({
    type: 'REMOVE_NOTE',
    id
});