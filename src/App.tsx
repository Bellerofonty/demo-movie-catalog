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

const PROD_PATH = "/demo-movie-catalog"
const DEV_PATH = ""
export const PATH = process.env.NODE_ENV === 'production' ? PROD_PATH : DEV_PATH

function App() {
    const navigate = useNavigate();

    return (
        <>
            <header>
                <div onClick={() => navigate(`${PATH}/movie/random`)}>
                    Случайный фильм
                </div>
                <div onClick={() => navigate(`${PATH}/`)}>Список фильмов</div>
            </header>
            <Routes>
                <Route path={`${PATH}/`} element={<Home />}/>
                <Route path={`${PATH}/movie/:id`} element={<Movie />}/>
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
