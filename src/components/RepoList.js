import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

const RepoList = (props) => {
    const [repoList, setRepoList] = useState([]);
    const [userData, setUserData] = useState([]);

    console.log("Repos data : %o", props.history.location.userData); // infinite API resp from SearchBar.js component


    // console.log(`Repo data length = %o`, Object.keys(userData).length);

        useEffect (() => {
            setUserData(props.history.location.userData);
            fetch (
                `${userData.url}/repos`,
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
                    setRepoList(response);
                    // console.log("Repo list = %o", response);
                })
                .catch(error => {
                    console.log(error);
                });
        }, [userData, props.history.location.userData]);
    console.log(`Repo list = %o`, repoList);

    console.log(`Repo data length = %o`, Object.keys(userData).length);
    if (Object.keys(userData).length > 0 && userData.constructor === Object) {
        console.log("It works");
        return (
            <>
                <div className="logo_and_username d-flex justify-content-center">
                    <img className="rounded" style={profilePictureStyle} src={userData.avatar_url} alt={userData.login}/>
                    <span className="px-3 fw-bold">{userData.login}</span>
                </div>
                <div className="repo_list_and_icons_container d-flex flex-column mt-4 px-5 pb-5">
                    {repoList.map((item, index) => (
                        <Link to={`/repo-details/${userData.login}/${item.name}`} className="list-group-item list-group-item-action" key={item.id}><i className="fas fa-folder"></i><span className="px-2">{item.name}</span></Link>
                    ))}
                </div>
            </>
        );
    } else {
        console.log("It doesn't work");
        // return <Redirect path="/"/>
        return <h1>Problem with API call : API response not recieved yet</h1>;
    }
}

const profilePictureStyle = {
    width: "30px",
    height: "30px"
}

export default RepoList;