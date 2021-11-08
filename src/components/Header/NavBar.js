import React from 'react';

import {NavLink} from "react-router-dom";

// import {setReset} from "../../store/actions";
// import {useDispatch} from "react-redux";

const NavBar = () => {
    // const dispatch = useDispatch();

    // We reset the states on click on homepage logo
    const handleClick = () => {
        // dispatch(setReset());
    }

    // We reset the states on click on browser go back button only if url = homepage url
    window.addEventListener('popstate', function () { // browser go back button event handler
        if (window.location.href === 'http://localhost:3000/') { // if url = 'http://localhost:3000/' after going back
            console.log("Went back");
            // dispatch(setReset());
        }
    });

    return (
        <div className="pos-f-t mb-4">
            <nav className="navbar navbar-dark bg-dark d-flex justify-content-start custom-color-navbar">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink to="/" onClick={handleClick} className="text-white my-0 text-decoration-none">Github Dashboard Sample</NavLink>
            </nav>
        </div>
    );
};

export default NavBar;