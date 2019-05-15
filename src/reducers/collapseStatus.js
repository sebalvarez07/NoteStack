const defaultCollapseState = {
    sidebarCollapsed: false,
    headerCollapsed: false
}

const collapseStatusReducer = (state = defaultCollapseState, action) => {
    switch(action.type) {
        case 'SET_SIDEBAR_COLLPASED':
            return { ...state, sidebarCollapsed: true };
        case 'SET_SIDEBAR_NOT_COLLPASED':
            return { ...state, sidebarCollapsed: false };
        case 'SET_HEADER_COLLPASED':
            return { ...state, headerCollapsed: true };
        case 'SET_HEADER_NOT_COLLPASED':
            return { ...state, headerCollapsed: false };
        default: 
            return state;
    }
}

export default collapseStatusReducer;