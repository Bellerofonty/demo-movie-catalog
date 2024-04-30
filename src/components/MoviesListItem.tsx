import React from "react";

interface IMovieData {
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

export default function MoviesListItem({movieData, onListItemClick}: {
        movieData: IMovieData, onListItemClick: Function
    }) {
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