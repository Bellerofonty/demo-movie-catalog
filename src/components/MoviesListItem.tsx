import React from "react";
import {IMovieData} from "../models";
import {useNavigate} from 'react-router-dom'
import {PATH} from '../App'
import posterPlaceholder from '../img/poster-placeholder.jpg'


interface IMoviesListItemProps {
    movieData: IMovieData
}

export function MoviesListItem({movieData}: IMoviesListItemProps) {
    const navigate = useNavigate()

    return (
        <div className="movie-list-item">
            <img
                src={movieData.poster?.previewUrl || posterPlaceholder}
                className="movie-list-poster"
                alt="poster"
                onClick={() => {navigate(`${PATH}/movie/${movieData.id}`)}}
            />
            <div className="movie-list-info">
                <span className="movie-list-rating">
                    {movieData.rating.imdb.toString().substring(0,3)}
                </span>
                <div className="movie-list-desc">
                    <p>{movieData.name}</p>
                    <p>{movieData.year}</p>
                </div>
            </div>
        </div>
    )
}