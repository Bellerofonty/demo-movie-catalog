import React, {useState} from 'react';
import './App.css';
import MovieCard from "./components/MovieCard";
import MoviesList from "./components/MoviesList"

import * as token from './APIToken.json';
import * as moviesData from './moviesData.json'

const {APIToken} = token
const {docs} = moviesData

const movieData = {
    "id": 535341,
    "name": "1+1",
    "year": 2011,
    "description": "Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из тюрьмы. Несмотря на то, что Филипп прикован к инвалидному креслу, Дриссу удается привнести в размеренную жизнь аристократа дух приключений.",
    "rating": {
        "kp": 8.824,
        "imdb": 8.5,
        "filmCritics": 6.8,
        "russianFilmCritics": 100
    },
    "movieLength": 112,
    "poster": {
        "url": "https://image.openmoviedb.com/kinopoisk-images/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/orig",
        "previewUrl": "https://image.openmoviedb.com/kinopoisk-images/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/x1000"
    },
    "genres": [
        {
            "name": "драма"
        },
        {
            "name": "комедия"
        }
    ]
}

function App() {
    const [mode, setMode]= useState('card')
    const [movieId, setMovieId] = useState(535341)

    return (
        <div className="container">
            <header>
                <div onClick={() => {
                    setMode('card')
                }}>
                    Случайный фильм
                </div>
                <div onClick={() => setMode('list')}>Список фильмов</div>
            </header>
            {mode === 'card' && <MovieCard movieData={movieData}/>}
            {mode === 'list' && <MoviesList movieData={docs}/>}
        </div>
    )
}

export default App;
