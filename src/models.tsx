export interface IMovieData {
    id: number
    name: string
    names?: {
        name: string
        language?: string
        type?: string
    }[]
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