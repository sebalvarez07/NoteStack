const defaultSubjects = [];

export default (state = defaultSubjects, action) => {
    switch(action.type){
        case 'ADD_SUBJECT':
            return [...state, action.subject];
        default:
            return state;
    }
}