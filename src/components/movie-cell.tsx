import * as React from "react";
const logo = require('../assets/img/react_logo.svg');
import "../assets/scss/movie-cell.scss";
import {MovieCategory} from "./movie-madness";

interface MovieCellProps {
    movieInfo: MovieCategory
    optionPicked(opt: MovieCategory): void
    selected: boolean
}

export default class MovieCell extends React.Component<MovieCellProps, {}> {

    render() {
        const {movieInfo, optionPicked, selected} = this.props;
        const cellStying = selected ? 'addBorder' : 'movieCell';
        return (
            <div className={cellStying} onClick={() => optionPicked(movieInfo)}>
                <img src={logo}/>
                {movieInfo.genre}
            </div>
        );
    }
}