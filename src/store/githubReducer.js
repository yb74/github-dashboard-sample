import {LOADING, USER_REPOS_LIST, USER_INFOS, ERROR, RESET} from "./actions";

const initialState = {
    userInfos: [],
    userReposList: [],
    loading: false,
    error: false,
}

export default function githubReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                // get previous state
                ...state,
                // return new state
                loading: action.payload
            }
        case USER_REPOS_LIST:
            return {
                ...state,
                userReposList: [...state.userReposList, action.payload]
            }
        case USER_INFOS:
            return {
                ...state,
                userInfos: [...state.userInfos, action.payload]
            }
        case ERROR:
            return {
                ...state,
                error: action.error
            }
        case RESET:
            return initialState; //Always return the initial state
        default:
            return state
    }
};