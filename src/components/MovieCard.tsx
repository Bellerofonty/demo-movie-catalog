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

export default function MovieCard(movieData: IMovieData) {
    const data = movieData.movieData
    return (
        <div className="card">
            <h1 className="card-caption">Кино справочник</h1>
            <h2 className="name">
                <span className="rating">{data.rating.kp.toString().substring(0,3)}</span>
                {data.name}
            </h2>
            <div className="movie-card-content">
                <div className="description">
                    <p>{data.description}</p>
                    <p className="extra-info"><span className="desc">Длительность: </span>{data.movieLength}</p>
                    <p className="extra-info"><span className="desc">Год выхода: </span>{data.year}</p>
                    <p className="extra-info">
                        <span className="desc">Жанры: </span>
                        {data.genres
                            .map((genre) => {return genre.name})
                            .join(', ')
                        }
                    </p>
                </div>
                <img src={data.poster.previewUrl} alt="poster" className="poster"/>
            </div>
        </div>
    )
}