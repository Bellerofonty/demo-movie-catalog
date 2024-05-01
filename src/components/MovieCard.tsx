import React from "react";
import {IMovieData} from "../models";
import posterPlaceholder from '../img/poster-placeholder.jpg'

interface IMovieCardProps {
    movieData: IMovieData
}

export function MovieCard({movieData}: IMovieCardProps) {
    return (
        <div className="card">
            <h1 className="card-caption">Кино справочник</h1>
            <h2 className="name">
                <span className="rating">{movieData.rating.kp ? movieData.rating.kp.toString().substring(0, 3) : 'N/A'}</span>
                {movieData.name || (movieData.names && movieData.names[0].name)}
            </h2>
            <div className="movie-card-content">
                <div className="description">
                    <p>{movieData.description}</p>
                    <p className="extra-info">
                        <span className="desc">Длительность: </span>
                        {movieData.movieLength ? (movieData.movieLength + ' минут') : 'N/A'}
                    </p>
                    <p className="extra-info"><span className="desc">Год выхода: </span>{movieData.year || 'N/A'}</p>
                    <p className="extra-info">
                        <span className="desc">Жанры: </span>
                        {movieData.genres.length ?
                            movieData.genres
                                .map((genre) => {
                                    return genre.name
                                })
                                .join(', ') : 'N/A'
                        }
                    </p>
                </div>
                <img src={movieData.poster.previewUrl || posterPlaceholder} alt="poster" className="poster"/>
            </div>
        </div>
    )
}