const defaultState = {
    token: null,
    user: {},
}

const auth = (State = defaultState, action) => {
    switch(action.type){
        case 'LOGGEDIN':
            return{
                ...State,
                token: action.payload.data.session.id,
                user: action.payload.data.user
            }
        case 'LOGGEDOUT':
            return{
                ...State,
                ...defaultState
            }
        default:
            return State
    }
}

export default auth;