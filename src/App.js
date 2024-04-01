import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import AddBooks from './pages/AddBooks';
import Update from './pages/Update';
import Books from './pages/Books';
import "./style.css"
import Movies from './pages/Movies';
import AddMovies from './pages/AddMovies';
import Layout from './layout/layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Ranking from './pages/Ranking';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/movies" element={<Movies />}/>
        <Route path="/books" element={<Books />}/>
        <Route path="/addbooks" element={<AddBooks />}/>
        <Route path="/update/id" element={<Update />}/>
        <Route path="/addmovies" element={<AddMovies />}/>
        <Route path="/ranking" element={<Ranking />}/>
      </Routes>
    </div>
  );
}

export default App;

