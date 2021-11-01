import React from 'react';
import {Redirect, useParams} from "react-router-dom";

import StarIcon from '@mui/icons-material/Star';

import {store} from "../../store/";

const RepoDetails = () => {
    const state = store.getState().githubReducer

    let {id} = useParams();
    let idParam =+ id;

    // Checking if the states are still stocked in redux store, if not, we redirect to home (redirect to '/')
    if (state.userReposList.length === 0) {
        return <Redirect to={'/'}/>
    }

    const userReposList = state.userReposList[0][0];
    const repoDetails = Object.values(userReposList).filter(({id}) => id === idParam)[0];
    const doesIdExists = Object.values(userReposList).find(({id}) => id === idParam);

    console.log("param1 id = " + id);
    console.log("idParam = " + idParam);
    console.log("repoDetails = %o", repoDetails);
    console.log("doesIdExists = %o", doesIdExists);

    const formatDate = (date) => {
        return date.slice(0, 10);
    }

    if (Object.keys(repoDetails).length > 0 && repoDetails.constructor === Object) {
        return (
            <div className="text-center shadow-sm p-3 mb-5 bg-white rounded mx-4">
                <div className="flex justify-content-center top_part_repo_details d-flex px-4">
                    <div className="repo_img" style={profilePictureContainerStyle}>
                        <img className="rounded" src={repoDetails.owner.avatar_url} alt={repoDetails.owner.login} style={profilePictureStyle}/>
                    </div>
                    <div className="username_and_repo_url">
                        <span className="fw-bold">{repoDetails.owner.login}</span>
                        <br />
                        <a href={repoDetails.html_url} target="blank">{repoDetails.html_url}</a>
                        <p className="mt-2 text-center">
                            <StarIcon color="warning"/>
                            {repoDetails.stargazers_count}
                        </p>
                    </div>
                </div>
                <div className="middle_part_repo_details p-5">
                    <span className="fw-bold">{repoDetails.name}</span> <br />
                    <span>Created at : {formatDate(repoDetails.created_at)}</span> <br/>
                    <span>Last update : {formatDate(repoDetails.updated_at)}</span> <br/>
                    <span>Main used language(s)/techno(s) : {repoDetails.language}</span>
                </div>
                <div className="bottom_part_repo_details">
                    <p className="repo_description">{repoDetails.description}</p>
                </div>
            </div>
        );
    } else {
        return <Redirect to="/"/>
        // return <h1>Problem with API call : API response not recieved yet</h1>;
    }
};

const profilePictureStyle = {
    width: "50px",
    height: "50px",
}
const profilePictureContainerStyle = {
    paddingRight: "1em"
}

export default RepoDetails;