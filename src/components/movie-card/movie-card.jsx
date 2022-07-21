import React from "react";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return <div className="movie-card" onClick={() => { onMovideClick(movie); }}>{movie.Title}</div>;
  }
}