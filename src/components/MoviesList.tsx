import React, {useState} from "react";
import {MoviesListItem} from "./MoviesListItem";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {IMovieData} from "../models";

interface IMovieListProps {
    movieDataList: IMovieData[]
    onListItemClick: Function
}

export  function MoviesList({movieDataList, onListItemClick}: IMovieListProps) {
    const [currentPage, setCurrentPage] = useState(0)

    const currentMoviesIndexes = []
    for (let i:number = 0; i < 4; i++) {
        currentMoviesIndexes.push(currentPage * 4 + i)
    }

    function handlePaginationClick(pageNumber:number) {
        const buttons = document.querySelectorAll('.pagination-button')
        buttons[pageNumber].classList.add('active')
        buttons[currentPage].classList.remove('active')
        setCurrentPage(pageNumber)
    }

    function handleListItemClick(data: IMovieData) {
        onListItemClick(data)
    }

    return (
        <div className="list">
            <h1 className="card-caption">Кино справочник</h1>
            <h2 className="name">Лучшие фильмы</h2>
            <nav className="pagination">
                {/* TODO map */}
                <button key={1} className="pagination-button active" onClick={(e) => {handlePaginationClick(0)}}>1</button>
                <button key={2} className="pagination-button" onClick={(e) => {handlePaginationClick(1)}}>2</button>
                <button key={3} className="pagination-button" onClick={(e) => {handlePaginationClick(2)}}>3</button>
                <button key={4} className="pagination-button" onClick={(e) => {handlePaginationClick(3)}}>4</button>
                <button key={5} className="pagination-button" onClick={(e) => {handlePaginationClick(4)}}>5</button>
                <button key={6} className="pagination-button" onClick={(e) => {handlePaginationClick(5)}}>6</button>
            </nav>
            <div className="movies-list">
                {currentMoviesIndexes.map((i:number) => { // TODO filter?
                    return movieDataList[i] && <MoviesListItem
                        movieData={movieDataList[i]}
                        key={i}
                    />
                })}
            </div>
        </div>
    )
}