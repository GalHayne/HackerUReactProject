import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav
      className="navbar navbar-expand-sm navbar-light bg-light shadow-sm"
      aria-label="Fourth navbar example"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          Real<i className="bi bi-geo-fill"></i>App
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
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/my-cards">
                  My Cards
                </NavLink>
              </li>
            )}
            {user?.biz && <li className="nav-item">
              <NavLink className="nav-link" to="/users">
                CRM
              </NavLink>
            </li>}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-out">
                    Sign Out
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-in">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-up">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-up-biz">
                    Sign Up Business
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
