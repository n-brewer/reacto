import * as React from "react";

import "../assets/scss/movie-container.scss";
import {MovieCategory} from "./movie-madness";

interface MovieContainerProps {
    selection: MovieCategory
}

interface State {
    peopleList: string[]
}

export default class MovieContainer extends React.Component<MovieContainerProps, State> {
    constructor(props: MovieContainerProps) {
        super(props);
        this.state = { peopleList: [] }
    }
    componentDidMount() {
        fetch('https://randomuser.me/api/?results=4').then(results => {
            return results.json();
        }).then(data => {

        })
    }

    listMovies = (list: string[]) => {
        return list.map(movie => {
            return <div key={movie}>{movie}</div>
        })
    };

    render() {
        const {selection} = this.props;
        if (!selection) { return <div className="titleBar">titleBar</div> }
        return (
            <div className="containerBody">
                <div className="titleBar">titleBar</div>
                <h2>{selection.genre}</h2>
                {this.listMovies(selection.movies)}
            </div>
        );
    }
}