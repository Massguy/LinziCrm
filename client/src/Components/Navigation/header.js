import React from "react";
import { Link } from "react-router-dom";

const Header = ({ users, signOutUser }) => {
  return (
    <header className="bck_b_light">
      <div className="container">
        <div className="left">
          <div className="logo">The Lj Group</div>
        </div>
        <div className="right">
          <div className="top">
            {users.auth ? (
              <>
                <Link to="/dashboard">My account</Link>
                <span onClick={() => signOutUser()}>Log out</span>
              </>
            ) : (
              <Link to="/">Log in</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
