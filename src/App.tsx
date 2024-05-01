import React, {useState} from 'react';
import axios, {AxiosError} from "axios";
import './App.css';
import {MovieCard} from "./components/MovieCard";
import {MoviesList} from "./components/MoviesList"
import {IMovieData} from "./models";

import * as token from './APIToken.json';
import * as moviesData from './moviesData.json'

const {APIToken} = token

const {docs} = moviesData
const movieDataDefault = docs[0]


function App() {
    const [mode, setMode] = useState('card')
    const [movieData, setMovieData] = useState(movieDataDefault)

    async function getMovieData({id, random}: { id?: number, random?: boolean }) {
        const fields = ['id', 'name', 'rating', 'genres', 'description', 'poster', 'year', 'movieLength']
        const options: {
            [key: string]: string | {
                [key: string]: string | string[]
            }
        } = {
            method: 'GET',
            params: {
                page: '1',
                limit: '1',
                selectFields: fields,
                notNullFields: fields,
                type: 'movie',

            },
            headers: {accept: 'application/json', 'X-API-KEY': APIToken}
        }

        if (random) {
            options.url = 'https://api.kinopoisk.dev/v1.4/movie/random'
        } else if (id) {
            options['id'] = id.toString()
            options.url = 'https://api.kinopoisk.dev/v1.4/movie/'
        }

        try {
            const response = await axios.request(options)
            setMovieData(response.data)
        } catch (e) {
            const error = e as AxiosError
            console.error(error.message)

            // API Кинопоиска может работать нестабильно
            setMovieData(movieDataDefault)
            console.error('Request error. Using local data')
        }
    }

    function handleRandomMovieClick() {
        getMovieData({random: true})
        setMode('card')
    }

    function handleListItemClick(data: IMovieData) {
        setMovieData(data)
        setMode('card')
    }

    return (
        <div className="container">
            <header>
                <div onClick={() => {
                    handleRandomMovieClick()
                }}>
                    Случайный фильм
                </div>
                <div onClick={() => setMode('list')}>Список фильмов</div>
            </header>
            {mode === 'card' && <MovieCard movieData={movieData} />}
            {mode === 'list' && <MoviesList movieDataList={docs} onListItemClick={handleListItemClick} />}
        </div>
    )
}

export default App;
