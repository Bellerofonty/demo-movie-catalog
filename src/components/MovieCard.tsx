import React from "react";
import {IMovieData} from "../models";
import posterPlaceholder from '../img/poster-placeholder.jpg'

interface IMovieCardProps {
    movieData: IMovieData
    nextRandomMovie?: VoidFunction
}

export function MovieCard({movieData, nextRandomMovie}: IMovieCardProps) {
    return (
        <div className="card">
            <h1 className="caption">Кино справочник</h1>
            <h2 className="name">
                <span className="rating">
                    {movieData.rating.imdb ? movieData.rating.imdb.toString().substring(0, 3) : 'N/A'}
                </span>
                {movieData.name || (movieData.names && movieData.names[0].name)}
            </h2>
            <div className="content">
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
                <img src={movieData.poster?.previewUrl || posterPlaceholder} alt="poster" className="poster"/>
            </div>
            {nextRandomMovie && (<button type="button" className="next-random-movie" onClick={nextRandomMovie}>
                Новый случайный фильм
            </button>)}
        </div>
    )
}