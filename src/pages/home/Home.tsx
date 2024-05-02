import {MoviesList} from "../../components/MoviesList";
import React, {useCallback, useEffect, useReducer} from "react";
import * as moviesData from "../../moviesData.json"
import {getMoviesList} from "../request";
import {IMovieData} from "../../models";
import {Loader} from "../../components/Loader";

const {docs} = moviesData

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

const moviesListReducer = (state: MoviesListState, action: MoviesListAction): MoviesListState => {
    switch (action.type) {
        case 'setReady':
            return {state: 'ready', moviesList: action.payload}
        case 'reset':
            return {state: 'loading'}
    }
}

export const Home = () => {
    const [movieListState, dispatch] = useReducer(moviesListReducer, {state: 'loading'})

    useEffect(() => {
        getMoviesList({limit: 24})
            .then((data) => {
                dispatch({type: 'setReady', payload: data})
            })
            .catch((e) => {
                console.error(e)
                dispatch({type: 'setReady', payload: docs})
            })
    }, [])

    const updateRandomMovie = useCallback(() => {
        getMoviesList({limit: 24})
            .then((data) => {
                dispatch({
                    type: 'setReady',
                    payload: data
                })
            })
            .catch((e) => {
                console.error(e)
                dispatch({type: 'setReady', payload: docs})
            })
    }, [])

    if (movieListState.state === 'loading') {
        return <Loader/>
    }

    return (
        <MoviesList movieDataList={movieListState.moviesList} />
    )
}