import { Link } from "react-router-dom";
import classes from './MainNavigation.module.css';
function MainNavigation(){
    return(
        <header className={classes.header}>
            <div className={classes.logo}><Link to='/home'>LibraFlick</Link></div>
            <nav>
                <ul>
                    <li>
                        <Link to='/movies'>My Movies</Link>
                    </li>
                    <li>
                        <Link to='/books'>My Books</Link>
                    </li>
                    <li>
                        <Link to='/addmovies'>Add New Movies</Link>
                    </li>
                    <li>
                        <Link to='/addbooks'>Add New Books</Link>
                    </li>
                    <li>
                        <Link to='/ranking'>Ranking</Link>
                    </li>
                    <li>
                        <Link to='/'>Sign Out</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default MainNavigation;