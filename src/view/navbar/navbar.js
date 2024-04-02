import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar" style={{ background: " #e3f2fd" }}>
      <div className="container-fluid">
        <form className="d-flex" role="search">
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
