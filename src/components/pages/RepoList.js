import React from 'react';
import {Link, Redirect} from "react-router-dom";

import {store} from "../../store/";

const RepoList = (props) => {
    const state = store.getState().githubReducer;

    console.log("State = %o", state);

    // Checking if the states are still stocked in redux store, if not, we redirect to home (redirect to '/')
    if (state.userReposList.length === 0 || state.userInfos.length === 0) {
        return <Redirect to={'/'}/>
    }

    const userInfos = state.userInfos[0][0];
    const userReposList = state.userReposList[0][0];

    const userData = {
        login: userInfos.login,
        avatar_url: userInfos.avatar_url
    }

    if (Object.keys(userData).length > 0 && userData.constructor === Object) {
        return (
            <>
                <div className="logo_and_username d-flex justify-content-center">
                    <img className="rounded" style={profilePictureStyle} src={userData.avatar_url} alt={userData.login}/>
                    <span className="px-3 fw-bold" style={usernameStyle}>{userData.login}</span>
                </div>
                <div className="repo_list_and_icons_container d-flex flex-column mt-4 px-5 pb-5">
                    {userReposList.map((item, index) => (
                        <Link to={`/repo-details/${item.id}/${item.name}`} className="list-group-item list-group-item-action" key={index}><i className="fas fa-folder"></i><span className="px-2">{item.name}</span></Link>
                    ))}
                </div>
            </>
        );
    } else {
        console.log("It doesn't work");
        return <Redirect to={'/'}/>
        // return <h1>Problem with API call : API response not recieved yet</h1>;
    }
}

const profilePictureStyle = {
    width: "50px",
    height: "50px"
}

const usernameStyle = {
    fontSize: "1.5em"
}

export default RepoList;