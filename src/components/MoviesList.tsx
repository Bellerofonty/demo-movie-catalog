import React from "react";
import MoviesListItem from "./MoviesListItem";

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

export default function MoviesList(movieData: IMovieData) {
    const data = movieData.movieData
    return (
        <div className="card">
            <h1 className="card-caption">Кино справочник</h1>
            <h2 className="name">Лучшие фильмы</h2>
            <nav>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>&gt;</button>
            </nav>
            <div className="movies-list">
                <MoviesListItem movieData={data} />
            </div>
        </div>
    )
}