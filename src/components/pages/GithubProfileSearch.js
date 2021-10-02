import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import Spinner from "../UI/Spinner";

const GithubProfileSearch = () => {

    const [userList, setUserList] = useState([]);

    const [usernameInputVal, setUsernameInputVal] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState("");

    // const [limit, setLimit] = useState(5); // limit the suggestion list to 5 names
    const limit = 5; // limit the suggestion list to 5 names
    const history = useHistory();

    // API call
    const getUsernameList = async () => {
        if (usernameInputVal.length >= 2) {
            await fetch(
                `https://api.github.com/search/users?q=${usernameInputVal}`,
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

                    setUserList(response.items); // array of github profile objects
                    console.log(`Api (getUsernameList) response : %o `, response);

                })
                .catch(error => {
                    if (error.status === 403) {
                        console.log('API rate limit exceeded.');
                    } else {
                        console.log('An error occurred.');
                    }
                });
        }
    }

    const getUserInfo = async () => {
        setIsLoading(true);
        await fetch (
            `https://api.github.com/users/${usernameInputVal}`,
            {
                method: "GET",
                // headers: new Headers({
                //     Accept: "application/json"
                // })
            }
        )   .then(res => res.json())
            .then(response => {
                setIsLoading(false);

                console.log(`Api (getUserInfo)response : %o `, response);

                history.push({pathname: '/repo-list', userData: response}); // prob : response contains infinite data
            })
            .catch(error => {
                if (error.status === 403) {
                    console.log('API rate limit exceeded.');
                } else {
                    console.log('An error occurred.');
                }
            });
    }

    const handleUserNameSelection = (selection) => {
        setUsernameInputVal(selection);
        setUserList([]);
    }

    const onChangeHandler = (e) => {
        setUsernameInputVal(e.target.value);
        getUsernameList();
    }

    const onSubmitHandler = async () => {
        if (usernameInputVal === "") {
            console.log("Please, fill in the form");
            setFormError("please, fill in the form");
        } else {
            await getUserInfo();
        }
    }

    return (
        <div className="h-100 d-flex flex-column justify-content-center align-items-center text-center">
            <div className="input-and-submitButton-container d-flex justify-content-center align-items-center text-center w-100">
                <input
                    type="text"
                    id="searchInput"
                    placeholder="username"
                    className="m-2 w-75"
                    value={usernameInputVal}
                    onChange={onChangeHandler}
                />
                <button
                    type="submit"
                    className="btn-danger custom-color-search-button"
                    onClick={onSubmitHandler}
                >Search</button>
            </div>
            {isLoading ? <Spinner /> : <p>Not loading</p>}
            {formError ? <p>{{formError}}</p> : null}
            {userList.length > 0  ?
                <div className="">
                    {userList.slice(0, limit ? limit : userList.length).map((item, index) => (
                        <p className="px-3 py-1" key={index}>
                            <a href="#" id="suggestionLinks" className="font-semibold text-black text-decoration-none px-3 py-1"
                               onClick={() => handleUserNameSelection(item.login)}
                            >{item.login}</a>
                        </p>
                    ))}
                </div> : null}
        </div>
    );
};

export default GithubProfileSearch;
