import React, {useCallback, useEffect, useReducer} from "react";
import * as moviesData from "../../moviesData.json"
import {MovieCard} from "../../components/MovieCard";
import {useParams, Params} from "react-router-dom"
import {IMovieData} from "../../models";
import {Loader} from "../../components/Loader";
import {getMovieData, getRandomMovie, MovieId} from "./request";

const {docs} = moviesData

const parseIdFromParams = (params: Params): MovieId => {
    const {id} = params;
    if (!id) {
        return 'random'
    }

    const parsedId = parseInt(id)
    if (isNaN(parsedId)) {
        return 'random'
    }

    return parsedId
}

type MovieState = {
    state: 'loading',
} | {
    state: 'ready',
    movieData: IMovieData
}

type MovieAction = {
    type: 'setReady',
    payload: IMovieData
} | {
    type: 'reset'
}

const movieReducer = (state: MovieState, action: MovieAction): MovieState => {
    switch (action.type) {
        case 'setReady':
            return {state: 'ready', movieData: action.payload}
        case 'reset':
            return {state: 'loading'}
    }
}

export const Movie = () => {
    const params = useParams();
    const [movieState, dispatch] = useReducer(movieReducer, {state: 'loading'})
    const id = parseIdFromParams(params)

    useEffect(() => {
        getMovieData({id})
            .then((data) => {
                dispatch({type: 'setReady', payload: data})
            })
            .catch((e) => {
                console.error(e)
                dispatch({type: 'setReady', payload: docs[0]})
            })
    }, [])

    const updateRandomMovie = useCallback(() => {
        getRandomMovie()
            .then((data) => {
                dispatch({
                    type: 'setReady',
                    payload: data
                })
            })
            .catch((e) => {
                console.error(e)
                dispatch({type: 'setReady', payload: docs[0]})
            })
    }, [])


    if (movieState.state === 'loading') {
        return <Loader/>
    }

    return (
        <MovieCard movieData={movieState.movieData} nextRandomMovie={id === "random" ? updateRandomMovie : undefined} />
    )
}