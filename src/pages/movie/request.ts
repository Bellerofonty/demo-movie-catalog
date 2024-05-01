import {IMovieData} from "../../models";
import axios from "axios";
import {FIELDS, MOVIE_URL, RANDOM_MOVIE_URL} from "./const";
import * as token from '../../APIToken.json'

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
        limit: '1',
        selectFields: typeof FIELDS,
        notNullFields: typeof FIELDS,
        type: 'movie',
        id?: 'random'
    },
    headers: {accept: 'application/json', 'X-API-KEY': string},
    url: typeof RANDOM_MOVIE_URL | typeof MOVIE_URL;
}

const commonOptions: Partial<Options> = {
    method: 'GET',
    params: {
        page: '1',
        limit: '1',
        selectFields: FIELDS,
        notNullFields: FIELDS,
        type: 'movie',
    },
    headers: {accept: 'application/json', 'X-API-KEY': APIToken},
}

const getRandomMovie = (): Promise<IMovieData> => {
    const options = {
        ...commonOptions,
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
            id
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
    return id === 'random' ? getRandomMovie() : getMovieDataById(Number(id))
}
