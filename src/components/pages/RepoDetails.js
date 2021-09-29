import React, {useState, useEffect} from 'react';
import {Redirect, useParams} from "react-router-dom";

const RepoDetails = () => {
    const [repoDetails, setRepoDetails] = useState([]);

    let {login, repo} = useParams();

    console.log("param1 login = " + login + " param2 repo = " + repo);

    // API call
    useEffect (() => {
        fetch (
            `https://api.github.com/repos/${login}/${repo}`,
            {
                method: "GET",
                // headers: new Headers({
                //     Accept: "application/json"
                // })
            }
        )
            .then(res => res.json())
            .then(response => {
                // setIsLoading(false);

                // console.log(`Api (getRepoList) response : %o `, response);
                setRepoDetails(response);
                // console.log("Repo list = %o", response);
            })
            .catch(error => {
                console.log(error);
            });
    }, [login, repo]);

    console.log(`Repo details = %o`, repoDetails);
    console.log(`Repo details length = %o`, Object.keys(repoDetails).length);

    const formatDate = (date) => {
        return date.slice(0, 10);
    }

    if (Object.keys(repoDetails).length > 0 && repoDetails.constructor === Object) {
        return (
            <div className="text-center shadow-sm p-3 mb-5 bg-white rounded mx-4">
                <div className="flex justify-content-center top_part_repo_details d-flex px-4">
                    <div className="repo_img" style={profilePictureContainerStyle}>
                        <img className="rounded" src={repoDetails.owner.avatar_url} style={profilePictureStyle}/>
                    </div>
                    <div className="username_and_repo_url">
                        <span className="fw-bold">{repoDetails.owner.login}</span>
                        <br />
                        <a href={repoDetails.html_url} target="blank">{repoDetails.html_url}</a>
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
        // return <Redirect path="/"/>
        return <h1>Problem with API call : API response not recieved yet</h1>;
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