export const LOADING = 'LOADING';
export const USER_INFOS = 'USER_INFOS';
export const USER_REPOS_LIST = 'USER_REPOS_LIST';
export const ERROR = 'ERROR';
// export const RESET = "RESET";

export const setUserReposList = (userReposListArr) => dispatch => {
    dispatch({
        type: USER_REPOS_LIST,
        payload: userReposListArr
    });
}

export const setUserInfos = (userInfosArr) => dispatch => {
    dispatch({
        type: USER_INFOS,
        payload: userInfosArr
    });
}

export const setIsLoading = (loading) => dispatch => {
    dispatch({
        type: LOADING,
        payload: loading
    });
}

export const setHasError = (error) => dispatch => {
    dispatch({
        type: ERROR,
        payload: error
    });
}

// export const setReset = () => dispatch => {
//     dispatch({
//         type: RESET
//     });
// }