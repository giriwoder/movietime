import React from "react";
import {useNavigate} from "react-router-dom";

const Navbar = (props) => {
    const userId = props.userId;
     const navigate = useNavigate();
    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const userId = searchParams.get("userId");

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: "lightblue"}}>
            <a className="navbar-brand shift-left" href="#">
                Movie Time Team #5
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a data-testid = "home" className="nav-link" style={{ cursor: "pointer" }}  onClick={() => {
                            console.log(userId);
                            console.log(props.userId);
                            props.setHasComeFromValid(true);
                            navigate(`/search?userId=${userId}`)
                        }}>
                            Search Page
                        </a>
                    </li>
                    <li className="nav-item">
                        <a data-testid = "other" className="nav-link" style={{ cursor: "pointer" }}  onClick={() => {
                            props.setHasComeFromValid(true);
                            navigate(`/user?userId=${userId}`)
                        }}>
                            All Lists
                        </a>
                    </li>
                    <li className="nav-item">
                        <a data-testid = "movie" className="nav-link" style={{ cursor: "pointer" }} onClick={() => {
                            props.setHasComeFromValid(false);
                            navigate("/login")
                        }}>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;