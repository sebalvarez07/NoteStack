const notesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_NOTE':
            return [...state, action.note];
        case 'EDIT_NOTE':
            return state.map(note => note.id === action.id ? {...note, ...action.updates} : note);
        case 'REMOVE_NOTE':
            return state.filter(note => note.id !== action.id);
        default:
            return state;
    }
};

export default notesReducer;