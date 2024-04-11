import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { Menu } from "@mui/icons-material";
function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">LibraFlick</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <Link to="/addmovies">Add New Movies</Link>
          </li>
          <li>
            <Link to="/addbooks">Add New Books</Link>
          </li>
          <li>
            <Link to="/ranking">Ranking</Link>
          </li>
          <li>
            <Link to="/usercart/:id">Cart</Link>
          </li>
          <li>
            <div>
              <Menu />
            </div>
            <div className="close">
                <li>
                    <Link to='/'>Home Nigga</Link>
                </li>
                <li>
                    <Link to='/'>Settings</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>

            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigation;
