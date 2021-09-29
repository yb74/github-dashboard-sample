import React from 'react';

import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <div className="pos-f-t mb-4">
            <nav className="navbar navbar-dark bg-dark d-flex justify-content-start custom-color-navbar">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>

                </button>
                <NavLink to="/" className="text-white my-0 text-decoration-none">Github Dashboard Sample</NavLink>
            </nav>
        </div>
    );
};

export default NavBar;