import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import AddBooks from './pages/AddBooks';
import UpdateBook from './pages/UpdateBook';
import Books from './pages/Books';
import "./style.css"
import Movies from './pages/Movies';
import AddMovies from './pages/AddMovies';
import Layout from './layout/layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Ranking from './pages/Ranking';
import BookPage from './pages/BookPage';
import MoviePage from './pages/MoviePage';
import UserCart from './pages/UserCartBook';
import UpdateMovie from './pages/UpdateMovie';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/movies" element={<Movies />}/>
        <Route path="/books" element={<Books />}/>
        <Route path="/addbooks" element={<AddBooks />}/>
        <Route path="/books/updatebook/:id" element={<UpdateBook />} />
        <Route path="/movies/updatemovie/:id" element={<UpdateMovie />} />
        <Route path="/addmovies" element={<AddMovies />}/>
        <Route path="/ranking" element={<Ranking />}/>
        <Route path="/viewbook/:id" element={<BookPage/>} />
        <Route path="/viewmovie/:id" element={<MoviePage/>} />
        <Route path='/usercart/:id' element={<UserCart/>} />
      </Routes>
    </div>
  );
}

export default App;

