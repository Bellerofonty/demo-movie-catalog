import React from "react";

interface IMovieData {
    movieData: {
        id: number | string
        name: string
        description: string
        rating: {
            kp: number
            imdb: number
            filmCritics: number
            russianFilmCritics: number
        }
        poster: {
            url: string
            previewUrl: string
        }
        genres: {
            name: string
        }[]
        movieLength: number
        year: number
    }
}

export default function MoviesListItem(movieData: IMovieData) {
    const data = movieData.movieData
    return (
        <div className="movie-list-item">
            <img
                src={data.poster.previewUrl}
                className="movie-list-poster" alt="poster" />
            <div className="movie-list-info">
                <span className="movie-list-rating">
                    {data.rating.kp.toString().substring(0,3)}
                </span>
                <div className="movie-list-desc">
                    <p>{data.name}</p>
                    <p>{data.year}</p>
                </div>
            </div>
        </div>
    )
}