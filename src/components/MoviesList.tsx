import React, {useState} from "react";
import {MoviesListItem} from "./MoviesListItem";
import {IMovieData} from "../models";

interface IMovieListProps {
    movieDataList: IMovieData[]
}

const PAGES_COUNT = 6

const MOVIES_ON_PAGE = 4

export function MoviesList({movieDataList}: IMovieListProps) {
    const [currentPage, setCurrentPage] = useState(0)

    const firstMovieIndex = currentPage * MOVIES_ON_PAGE
    const movies = movieDataList.slice(firstMovieIndex, firstMovieIndex + MOVIES_ON_PAGE)

    function handlePaginationClick(pageNumber: number) {
        const buttons = document.querySelectorAll('.pagination-button')
        buttons[pageNumber].classList.add('active')
        buttons[currentPage].classList.remove('active')
        setCurrentPage(pageNumber)
    }

    return (
        <div className="list">
            <h1 className="caption">Кино справочник</h1>
            <h2 className="name">Лучшие фильмы</h2>
            <nav className="pagination">
                {
                    new Array(PAGES_COUNT)
                        .fill('')
                        .map((_, i) => (
                            <button
                                key={i}
                                className={i === 0 ? "pagination-button active" : 'pagination-button'}
                                onClick={() => {
                                    handlePaginationClick(i)
                                }}
                            >
                                {i + 1}
                            </button>))
                }
            </nav>
            <div className="movies-list">
                {movies
                    .map((movie) => {
                        return (<MoviesListItem
                            movieData={movie}
                            key={movie.id}
                        />)
                    })}
            </div>
        </div>
    )
}