import * as React from "react";
import "../assets/scss/movie-madness.scss";
import MovieCell from "./movie-cell";
import MovieContainer from "./movie-container";
import {stringify} from "querystring";

interface State {
    choice: MovieCategory
    movieInfo: Array<MovieCategory>
}

export default class MovieMadness extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {choice: null, movieInfo: MovieInfo};
    }
    componentDidMount() {
        const opt = localStorage.getItem('usersChoice');
        if (!opt) { return }
        try {
            let obj = JSON.parse(opt);
            this.setState({choice: obj})
        } catch (err) { console.log(err) }
    }

    handleCategoryPicked = (opt: MovieCategory) => {
        localStorage.setItem('usersChoice', JSON.stringify(opt));
        this.setState({choice: opt})
    };

    listCategories = () => {
        return MovieInfo.map((info: MovieCategory) => {
            return <MovieCell selected={info === this.state.choice} optionPicked={(opt) => this.handleCategoryPicked(opt)} movieInfo={info}/>;
        });
    };

    addMovie = () => {
        const genreInput = document.getElementById('movieCat') as HTMLInputElement;
        const titleInput = document.getElementById('movieTitle') as HTMLInputElement;
        if (!titleInput.value || !genreInput.value) { return }
        const newMovie = new MovieCategory(genreInput.value, [titleInput.value]);
        MovieInfo = [...MovieInfo, newMovie];
        localStorage.clear();
        this.setState({movieInfo: MovieInfo});
    };

    render() {
        const {choice} = this.state;
        return (
            <div className={"movieBody"}>
                <div className={"movieSidebar"}>
                    <div>
                        <h3>Choose Your Category</h3>
                        {this.listCategories()}
                    </div>
                    <div>
                        <input id={'movieCat'} type="search" placeholder={'enter new movie category'}/>
                        <input id={'movieTitle'} type="search" placeholder={'movie title'}/>
                        <button onClick={() => this.addMovie()} type="button">Add</button>
                    </div>
                </div>
                <MovieContainer selection={choice}/>
            </div>
        );
    }
}

export class MovieCategory {
    genre: string;
    movies: string[];

    constructor(genre: string, movies: string[]) {
        this.genre = genre;
        this.movies = movies;
    }
}

const funnies = new MovieCategory("Comedy", ["Liar Liar", "Ace Ventura", "Some other flicks"]);
const suspenders = new MovieCategory("Suspense", ["Conjuring", "Scary Movie"]);
const kiddies = new MovieCategory("Kids", ["Boss Baby", "My Little Pony", "Zootopia"]);

let MovieInfo = [funnies, suspenders, kiddies];