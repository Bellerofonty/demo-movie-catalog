import React from "react";
import {IMovieData} from "../models";
import {useNavigate} from 'react-router-dom'

interface IMoviesListItemProps {
    movieData: IMovieData
}

export function MoviesListItem({movieData}: IMoviesListItemProps) {
    const navigate = useNavigate();

    return (
        <div className="movie-list-item">
            <img
                src={movieData.poster.previewUrl}
                className="movie-list-poster" alt="poster"
                onClick={() => {navigate(`/movie/${movieData.id}`)}}
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