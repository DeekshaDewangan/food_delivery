import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate

  const handleLogout = ()=>{

    // We are removing the authToken
    localStorage.removeItem("authToken")
    navigate("/login")

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                {/* It will lead to home page */}
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {/* We want to see myOrder option when we are already loged in */}
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  {/* It will lead to home page */}
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/"
                  >
                    MyOrders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                {/* It will lead to login page */}
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                {/* It will lead to SignUp page */}
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-2">MyCart</div>
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
