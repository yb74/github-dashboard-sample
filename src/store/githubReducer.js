// import {LOADING, USER_REPOS_LIST, USER_INFOS, ERROR, RESET} from "./actions";
import {LOADING, USER_REPOS_LIST, USER_INFOS, ERROR} from "./actions";

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
                userReposList: [action.payload]
                // userReposList: [...state.userReposList, action.payload] // we write this if we need to stock the previous states in the array of states
            }
        case USER_INFOS:
            return {
                ...state,
                userInfos: [action.payload]
                // userInfos: [...state.userInfos, action.payload]
            }
        case ERROR:
            return {
                ...state,
                error: action.error
            }
        // case RESET:
        //     return initialState; //Always return the initial state
        default:
            return state
    }
};