// Authentication reducer

const authenticationReducer = (state = {}, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        default: 
            return state;
    }
};

export default authenticationReducer;