import React from "react";
import {IMovieData} from "../models";

interface IMovieCardProps {
    movieData: IMovieData
}

export function MovieCard({movieData}: IMovieCardProps) {
    return (
        <div className="card">
            <h1 className="card-caption">Кино справочник</h1>
            <h2 className="name">
                <span className="rating">{data.rating.kp ? data.rating.kp.toString().substring(0,3) : 'N/A'}</span>
                {data.name || data.names[0].name}
            </h2>
            <div className="movie-card-content">
                <div className="description">
                    <p>{data.description}</p>
                    <p className="extra-info"><span className="desc">Длительность: </span>{data.movieLength}</p>
                    <p className="extra-info"><span className="desc">Год выхода: </span>{data.year}</p>
                    <p className="extra-info">
                        <span className="desc">Жанры: </span>
                        {movieData.genres.length ?
                            movieData.genres
                                .map((genre: {
                                    name: string
                                    [key:string]: string
                                }) => {
                        }
                    </p>
                </div>
                <img src={movieData.poster.previewUrl} alt="poster" className="poster"/>
            </div>
        </div>
    )
}