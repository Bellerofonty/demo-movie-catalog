import {MoviesList} from "../../components/MoviesList";
import React from "react";
import * as moviesData from "../../moviesData.json"
import {MovieCard} from "../../components/MovieCard";
import {useParams} from "react-router-dom"
const {docs} = moviesData

export const Movie = () => {
    const { id } = useParams();
    return (
        // <MovieCard movieData={movieData}/>
        <div>{id}</div>
    )
}