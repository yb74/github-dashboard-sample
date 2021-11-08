import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {useSelector, useDispatch} from "react-redux";
import {setUserReposList, setUserInfos, setIsLoading, setHasError} from '../../store/actions';

import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Spinner from "../UI/Spinner";

const GithubProfileSearch = () => {
    // redux
    const {userReposList} = useSelector(state => state.githubReducer);
    const {userInfos} = useSelector(state => state.githubReducer);
    const {loading} = useSelector(state => state.githubReducer);
    const {error} = useSelector(state => state.githubReducer);

    const dispatch = useDispatch();

    // console.log(`user repo list [useSelector] = %o`, userReposList);
    // console.log(`user infos [useSelector] = %o`, userInfos);
    // console.log(`loading [useSelector] = %o`, loading);
    // console.log(`error [useSelector] = %o`, error);

    const [userList, setUserList] = useState([]);

    const [usernameInputVal, setUsernameInputVal] = useState("");
    const [formError, setFormError] = useState("");
    const [open, setOpen] = useState(false);

    // const [limit, setLimit] = useState(5); // limit the suggestion list to 5 names
    const limit = 5; // limit the suggestion list to 5 names
    const history = useHistory();

    // API call
    // const getUsernameList = async (typedName) => {
    //     if (usernameInputVal.length >= 2) {
    //         try {
    //             const res = await fetch(`https://api.github.com/search/users?q=${typedName}`);
    //             // const res = await fetch(url, {
    //             //     method: "GET",
    //             //     // headers: new Headers({
    //             //     //     Accept: "application/json"
    //             //     // })
    //             // });
    //             const data = await res.json();
    //             await setUserList(data.items); // array of github profile objects
    //             // setUserList(data.items); // array of github profile objects
    //             console.log(data);
    //         } catch(err) {
    //             console.error(err);
    //             dispatch(setHasError(true));
    //             if (err.status === 403) {
    //                 console.log(err);
    //                 console.log("test error 403");
    //                 setFormError('API rate limit exceeded. [getUsernameList function]');
    //                 setOpen(true);
    //                 return err;
    //             } else {
    //                 setFormError('An error occurred. [getUsernameList function]');
    //                 setOpen(true);
    //                 return err;
    //             }
    //         }
    //     }
    // }

    const getUsernameList = async (typedName) => {
        if (usernameInputVal.length >= 2) {
            // const res = await fetch(`https://api.github.com/search/users?q=${typedName}`);
            // // await fetch(`https://api.github.com/search/users?q=${typedName}`,
            // //     {
            // //         method: "GET",
            // //         // headers: new Headers({
            // //         //     Accept: "application/json"
            // //         // })
            // //         }
            // //     )
            // if (!res.ok) {
            //     if (res.status === 403) {
            //         console.log(res);
            //         console.log("test error 403");
            //         setFormError('API rate limit exceeded. [getUsernameList function]');
            //         setOpen(true);
            //         return res;
            //     } else {
            //         setFormError('An error occurred. [getUsernameList function]');
            //         setOpen(true);
            //         return res;
            //     }
            // }
            // const data = await res.json();
            // console.log("Data = %o", data);
            // setUserList(data.items); // array of github profile objects
            // return data;

            fetch(`https://api.github.com/search/users?q=${typedName}`)
            // fetch(`https://api.github.com/search/users?q=${typedName}`,
                // //     {
                // //         method: "GET",
                // //         // headers: new Headers({
                // //         //     Accept: "application/json"
                // //         // })
                // //         }
                // //     )
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        dispatch(setHasError(true));
                        if (response.status === 403) {
                            setFormError('API rate limit exceeded.');
                            setOpen(true);
                            throw new Error('API rate limit exceeded. [getUsernameList function]');
                        } else {
                            setFormError('An error occurred.');
                            setOpen(true);
                            throw new Error('An error occurred. [getUsernameList function]');
                        }
                    }
                })
                .then((responseJson) => {
                    // Do something with the response
                    console.log("Data = %o", responseJson);
                    setUserList(responseJson.items); // array of github profile objects
                    return responseJson;
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    const getUserInfo = async () => {
        dispatch(setIsLoading(true));

        const response = await fetch(`https://api.github.com/users/${usernameInputVal}`);
        if (!response.ok) {
            dispatch(setHasError(true));
            dispatch(setIsLoading(false));
            if (response.status === 404) {
                setFormError('This user doesn\'t exist. Please enter a valid username !');
                console.log('API rate limit exceeded. [getUserInfo function]');
                setOpen(true);
                // throw new Error('API rate limit exceeded. [getUserInfo function]');
                return response;
            } else {
                setFormError('An error occurred.');
                console.log('An error occurred. [getUserInfo function]');
                setOpen(true);
                // throw new Error('An error occurred. [getUserInfo function]');
                return response;
            }
        }
        const data = await response.json();
        dispatch(setIsLoading(false));
        console.log(`Api (getUserInfo)response : %o `, data);
        dispatch(setUserInfos([data]));
        console.log("Data with users repo list = %o", data);
        await getReposList(data.repos_url);

        console.log("User info = %o", userInfos);

        history.push('/repo-list');
        return data;
    }

    const getReposList = async (reposUrl) => {
        dispatch(setIsLoading(true));
        const res = await fetch(reposUrl);

        if (!res.ok) {
            dispatch(setHasError(true));
            if (res.status === 403) {
                setFormError('API rate limit exceeded.');
                setOpen(true);
            } else {
                setFormError('An error occurred.');
                setOpen(true);
            }
        }

        const data = await res.json();
        dispatch(setIsLoading(false));
        dispatch(setUserReposList([data]));
        console.log("User repos list = %o", data);
        return data;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleUserNameSelection = (selection) => {
        setUsernameInputVal(selection);
        setUserList([]);
    }

    const handleChange = (e) => {
        setUsernameInputVal(e.target.value.trim());
        let typedName = e.target.value.trim();
        getUsernameList(typedName).then();

        console.log("e value = %o", e.target.value);
        console.log("usernameInputVal = %o", usernameInputVal);
        console.log("typed name = %o", typedName);
        // getUsernameList().then((data) => console.log(`Api (getUsernameList) response : %o `, data));
    }

    const handleSubmit = async () => {
        if (usernameInputVal === "") {
            setOpen(true);
            setFormError("please, fill in the form");
        } else {
            await getUserInfo();
        }
    }
    // console.log(userList.length);
    return (
        <div className="h-100 d-flex flex-column justify-content-center align-items-center text-center">
            <div className="input-and-submitButton-container d-flex justify-content-center align-items-center text-center w-100">
                <input
                    type="text"
                    id="searchInput"
                    placeholder="username"
                    className="m-2 w-75"
                    value={usernameInputVal}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="btn-danger search-button"
                    onClick={handleSubmit}
                >Search</button>
            </div>
            {loading ? <Spinner /> : null}
            {userList.length > 0  ?
                <div className="">
                    {userList.slice(0, limit ? limit : userList.length).map((item, index) => (
                        <div className="px-3 py-1" key={index}>
                            <p id="suggestionLinks" className="font-semibold text-white px-3 py-1 suggestionLinks"
                               onClick={() => handleUserNameSelection(item.login)}
                            >{item.login}</p>
                        </div>
                    ))}
                </div> : null}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={formError}
                action={
                    <>
                        <Button color="info" size="small" onClick={handleClose}>
                            Close
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            X
                        </IconButton>
                    </>
                }
            />
        </div>
    );
};

export default GithubProfileSearch;
