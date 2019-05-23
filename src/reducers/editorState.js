const editorStateReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_EDITOR_STATE':
            return action.editorState;
        default:
            return state
    }
}

export default editorStateReducer;