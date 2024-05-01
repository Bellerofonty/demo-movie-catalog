import {MoviesList} from "../../components/MoviesList";
import React, {useEffect, useReducer, useState} from "react";
import * as moviesData from "../../moviesData.json"
import {MovieCard} from "../../components/MovieCard";
import {useParams, Params} from "react-router-dom"
import {IMovieData} from "../../models";
import * as token from '../../APIToken.json'
import axios, {AxiosError} from "axios";
import {Loader} from "../../components/Loader";

type MovieId = number | 'random'

interface IGetMovieDataParams {
    id: MovieId
}

interface IResponseData {
    docs?: IMovieData[]
}

const {docs} = moviesData
const {APIToken} = token
const fields = ['id', 'name', 'rating', 'genres', 'description', 'poster', 'year', 'movieLength']

const getMovieData = ({id}: IGetMovieDataParams): Promise<IMovieData> => {
    const options = {
        method: 'GET',
        params: {
            page: '1',
            limit: '1',
            selectFields: fields,
            notNullFields: fields,
            type: 'movie',
            id: id === "random" ? undefined : id
        },
        headers: {accept: 'application/json', 'X-API-KEY': APIToken},
        url: id === "random" ? 'https://api.kinopoisk.dev/v1.4/movie/random' : 'https://api.kinopoisk.dev/v1.4/movie',
    }

    return axios.request(options)
        .then(({data}: {data: IResponseData}) => {
            if (!data || !data.docs || !data.docs[0]) {
                throw new Error('No data')
            }

            return data.docs[0]
    })
}

const parseIdFromParams = (params: Params<string>): MovieId => {
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
    useEffect(() => {
        getMovieData({id: parseIdFromParams(params)})
            .then((data) => {
                dispatch({type: 'setReady', payload: data})
            })
            .catch((e) => {
                console.error(e)
                dispatch({type: 'setReady', payload: docs[0]})
            })
    }, [])

    if (movieState.state === 'loading') {
        return <Loader />
    }

    return (
        <MovieCard movieData={movieState.movieData}/>
    )
}