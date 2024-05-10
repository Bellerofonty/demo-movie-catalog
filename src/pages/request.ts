import {IMovieData} from "../models";
import axios from "axios";
import {FIELDS, MOVIE_URL, RANDOM_MOVIE_URL, RETRY_COUNT} from "./movie/const";
import * as token from '../APIToken.json'

const {APIToken} = token

export type MovieId = number | 'random'

interface IGetMovieDataParams {
    id: MovieId
}

interface IResponseData {
    docs?: IMovieData[]
}

interface IResponseData {
    docs?: IMovieData[]
}

interface Options {
    method: 'GET'
    params: {
        page: '1',
        limit?: number,
        selectFields: typeof FIELDS,
        notNullFields: typeof FIELDS,
        type: 'movie',
        id?: string
    },
    headers: {accept: 'application/json', 'X-API-KEY': string},
    url: typeof RANDOM_MOVIE_URL | typeof MOVIE_URL;
}

const commonOptions: Partial<Options> = {
    method: 'GET',
    params: {
        page: '1',
        selectFields: FIELDS,
        notNullFields: FIELDS,
        type: 'movie',
    },
    headers: {accept: 'application/json', 'X-API-KEY': APIToken},
}

const getRandomMovie = (): Promise<IMovieData> => {
    const options = {
        ...commonOptions,
        params: {
            ...commonOptions.params,
            limit: 1
        },
        url: RANDOM_MOVIE_URL
    }
    return axios.request(options)
        .then(({data}:{data: IMovieData}) => {
            if (!data) {
                throw new Error('No data')
            }
            return data
        })
}

const getMovieDataById = (id: number): Promise<IMovieData> => {
    const options = {
        ...commonOptions,
        params: {
            ...commonOptions.params,
            id,
            limit: 1
        },
        url: MOVIE_URL
    }
    return axios.request(options)
        .then(({data}: {data: IResponseData}) => {
            if (!data || !data.docs || !data.docs[0]) {
                throw new Error('No data')
            }

            return data.docs[0]
        })
}

export const getMovieData = ({id}: IGetMovieDataParams): Promise<IMovieData> => {
    let count = 0;
    const request = () => {
        return id === 'random' ? getRandomMovie() : getMovieDataById(id)
            .catch((e) => {
                if (count < RETRY_COUNT) {
                    count++
                    return getMovieData({id})
                }
                throw e;
            })
    }
    return request()
}

export const getMoviesList = ({limit, genres, excludeId}: {
    limit: number,
    genres?: string,
    excludeId?: number
}): Promise<IMovieData[]> => {
    const options = {
        ...commonOptions,
        params: {
            ...commonOptions.params,
            limit,
            "genres.name": genres,
            'rating.kp': '1-10',
            'rating.imdb': '1-10'
        },
        url: MOVIE_URL
    }

    console.log(excludeId)
    if (excludeId) {
        options.params.id = `!${excludeId}`
        console.log('id added')
    }

    return axios.request(options)
        .then(({data}: {data: IResponseData}) => {
            if (!data || !data.docs) {
                throw new Error('No data')
            }

            return data.docs
        })
}