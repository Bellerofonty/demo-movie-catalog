import {MoviesList} from "../../components/MoviesList";
import React from "react";
import * as moviesData from "../../moviesData.json"
import {getMoviesList} from "../request";

const {docs} = moviesData

async function get() {
    const moviesList = await getMoviesList(5).then(data => data)
    console.log('list', moviesList)
}
console.log(get())

export const Home = () => {
    return (
        <MoviesList movieDataList={docs}/>
    )
}