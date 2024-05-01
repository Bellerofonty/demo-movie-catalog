import React from "react";
import {IMovieData} from "../models";

interface IMoviesListItemProps {
    movieData: IMovieData
    onListItemClick: Function
}

export function MoviesListItem({movieData, onListItemClick}: IMoviesListItemProps) {
    return (
        <div className="movie-list-item">
            <img
                src={movieData.poster.previewUrl}
                className="movie-list-poster" alt="poster"
                onClick={(e) => {onListItemClick(movieData)}}
            />
            <div className="movie-list-info">
                <span className="movie-list-rating">
                    {movieData.rating.kp.toString().substring(0,3)}
                </span>
                <div className="movie-list-desc">
                    <p>{movieData.name}</p>
                    <p>{movieData.year}</p>
                </div>
            </div>
        </div>
    )
}