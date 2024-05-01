import {MoviesList} from "../../components/MoviesList";
import React from "react";
import * as moviesData from "../../moviesData.json"
const {docs} = moviesData

export const Home = () => {
    return (
        <MoviesList movieDataList={docs} onListItemClick={() => {}}/>
    )
}