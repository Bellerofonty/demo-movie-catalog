import React, {useEffect, useReducer} from "react";
import {getMoviesList} from "../pages/request";
import {IMovieData} from "../models";
import {Loader} from "./Loader";
import {PATH} from "../App";
import {useNavigate} from "react-router-dom";
import posterPlaceholder from '../img/poster-placeholder.jpg'

type MoviesListState = {
    state: 'loading',
} | {
    state: 'ready',
    moviesList: IMovieData[]
}

type MoviesListAction = {
    type: 'setReady',
    payload: IMovieData[]
} | {
    type: 'reset'
}

const similarMoviesReducer = (state: MoviesListState, action: MoviesListAction): MoviesListState => {
    switch (action.type) {
        case 'setReady':
            return {state: 'ready', moviesList: action.payload}
        case 'reset':
            return {state: 'loading'}
    }
}

export const SimilarMovies = ({genres, id}: {genres: string, id: number}) => {
    const [similarMoviesState, dispatch] = useReducer(similarMoviesReducer, {state: 'loading'})
    const navigate = useNavigate()

    useEffect(() => {
        getMoviesList({limit: 5, genres, excludeId: id})
            .then((data) => {
                dispatch({type: 'setReady', payload: data})
            })
            .catch((e) => {
                console.error(e)
                dispatch({type: 'setReady', payload: []})
            })
    }, [])

    if (similarMoviesState.state === 'loading') {
        return <Loader/>
    }

    if (!similarMoviesState.moviesList.length) {
        return (
            <div>Похожих фильмов не найдено</div>
        )
    }

    return (
        <>
            <h2 className="caption-secondary">Похожие фильмы</h2>
            <div className="similar-movies">
                {similarMoviesState.moviesList.map((movie) => {
                    return (
                        <div className="similar-movies-item" key={movie.id}>
                            <div className="poster-container">
                                <img
                                    src={movie.poster?.previewUrl || posterPlaceholder}
                                    alt="poster"
                                    onClick={() => {
                                        navigate(`${PATH}/movie/${movie.id}`);
                                    }}
                                />
                            </div>
                            <p>{movie.name}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
