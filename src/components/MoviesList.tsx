import React, {useState} from "react";
import MoviesListItem from "./MoviesListItem";

// interface IMovieData {
//     movieData: {
//         id: number | string
//         name: string
//         description: string
//         rating: {
//             kp: number
//             imdb: number
//             filmCritics: number
//             russianFilmCritics: number
//         }
//         poster: {
//             url: string
//             previewUrl: string
//         }
//         genres: {
//             name: string
//         }[]
//         movieLength: number
//         year: number
//     }
// }

interface IMovieDataList {
    [key: string]: any
}

export default function MoviesList(movieDataList: IMovieDataList) {
    const [currentPage, setCurrentPage] = useState(0)
    const dataList = movieDataList.movieData

    let currentMoviesIndexes = []
    for (let i:number = 0; i < 4; i++) {
        currentMoviesIndexes.push(currentPage * 4 + i)
    }

    function handleClick(pageNumber:number) {
        const buttons = document.querySelectorAll('.pagination-button')
        buttons[pageNumber].classList.add('active')
        buttons[currentPage].classList.remove('active')
        setCurrentPage(pageNumber)
    }

    return (
        <div className="list">
            <h1 className="card-caption">Кино справочник</h1>
            <h2 className="name">Лучшие фильмы</h2>
            <nav className="pagination">
                <button key={1} className="pagination-button active" onClick={(e) => {handleClick(0)}}>1</button>
                <button key={2} className="pagination-button" onClick={(e) => {handleClick(1)}}>2</button>
                <button key={3} className="pagination-button" onClick={(e) => {handleClick(2)}}>3</button>
                <button key={4} className="pagination-button" onClick={(e) => {handleClick(3)}}>4</button>
                <button key={5} className="pagination-button" onClick={(e) => {handleClick(4)}}>5</button>
                <button key={6} className="pagination-button" onClick={(e) => {handleClick(5)}}>6</button>
                {/*<button key={7}>»</button>*/}
            </nav>
            <div className="movies-list">
                {currentMoviesIndexes.map((i:number) => {return dataList[i] && <MoviesListItem movieData={dataList[i]} key={i} />})}
            </div>
        </div>
    )
}