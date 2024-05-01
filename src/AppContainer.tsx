import React from 'react'
import './App.css';
import {useNavigate} from 'react-router-dom'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Home} from "./pages/home/Home";
import {Movie} from "./pages/movie/Movie";

function App() {
    const navigate = useNavigate();

    return (
        <>
            <header>
                <div onClick={() => navigate('/movie/random')}>
                    Случайный фильм
                </div>
                <div onClick={() => navigate('/')}>Список фильмов</div>
            </header>
            <Routes>

                <Route path="/" element={<Home />}/>
                <Route path="/movie/:id" element={<Movie />}/>
            </Routes>
        </>
    )
}

function AppContainer() {

    return (
        <div className="container">
            <Router>
                <App />
            </Router>
        </div>
    )
}

export default AppContainer;
