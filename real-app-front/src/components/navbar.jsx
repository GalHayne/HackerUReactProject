import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import useDarkContext from "../hooks/useDarkModa-context";
import { useState } from "react";

const Navbar = () => {
  const { user } = useAuth();

  const { toogleTheme, theme } = useDarkContext();

  const [isLihgtSelected, setIsLihgtSelected] = useState(false);

  const switchMode = (mode) => {
    mode === 'light' ? toogleTheme("light") : toogleTheme("dark");

    setIsLihgtSelected(mode === 'light');
  }

  const modeIcon =
    theme === "light" ? (
      <i className="bi bi-brightness-high"></i>
    ) : (
      <i className="bi bi-moon"></i>
    );

  const classNameHeader = `navbar navbar-expand-sm navbar-${theme} bg-${theme}`

  return (
    <nav className={classNameHeader} aria-label="Fourth navbar example">
      <div className="container">
        <Link className="navbar-brand" title="Main page" to="/">
          Hayne's <i className="bi bi-card-text"></i> Cards
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink title="About the web" className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink title="my cards" className="nav-link" to="/my-cards">
                  My Cards
                </NavLink>
              </li>
            )}
            {user?.admin && (
              <li className="nav-item">
                <NavLink title="users manager" className="nav-link" to="/users">
                  CRM
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            {user ? (
              <>
                <li title="sign out from the web" className="nav-item">
                  <NavLink title="log out" className="nav-link" to="/sign-out">
                    Sign Out
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user-details">
                    <div title="enter to user details">
                      <i className="bi bi-person"></i>
                    </div>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item" title="sign in to web">
                  <NavLink className="nav-link" to="/sign-in">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item" title="sign up to web">
                  <NavLink className="nav-link" to="/sign-up">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item" title="sign up busniess to web">
                  <NavLink className="nav-link" to="/sign-up-biz">
                    Sign Up Business
                  </NavLink>
                </li>
                <li className="nav-item" title="sign up busniess to web">
                  <NavLink className="nav-link" to="/sign-up-admin">
                    Sign Up Admin
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item dropdown" title="change theme">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {modeIcon}
              </a>
              <ul
                className="dropdown-menu p-3"
                aria-labelledby="navbarScrollingDropdown"
              >
                <li
                  className={
                    isLihgtSelected
                      ? `my-2 lightModeLi p-2 modeSelected btn-${theme}`
                      : "lightModeLi p-2"
                  }
                  onClick={() => {
                    switchMode('light')
                  }}
                >
                  <i className="bi bi-brightness-high"></i>Light
                </li>
                <li
                  className={
                    !isLihgtSelected
                      ? `my-2 lightModeLi p-2 modeSelected btn-${theme}`
                      : "darkModeLi p-2"
                  }
                  onClick={() => {
                    switchMode('dark');
                  }}
                >
                  <i className="bi bi-moon"></i>Drak
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
