import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { Menu } from "@mui/icons-material";
import ThemeSwitcher from "./ThemeSwitcher";
import Dashboard from "./Dashboard";
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
            <ThemeSwitcher />
          </li>
          <li>
            <Dashboard />
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigation;
