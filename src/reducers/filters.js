const defaultFilters = {
    text: '',
    sortBy: 'latest',
    subject: 'all_subjects'
}

const filtersReducer = (state = defaultFilters, action) => {
    switch(action.type) {
        case 'SET_TEXT':
            return { 
                ...state,
                text: action.text
            };
        case 'SET_LATEST':
            return {
                ...state,
                sortBy: 'latest'
            };
        case 'SET_EARLIEST':
            return {
                ...state,
                sortBy: 'earliest'
            };
        case 'SET_SUBJECT':
            return {
                ...state,
                subject: action.subject
            };
        default:
            return state;
    }
}

export default filtersReducer;