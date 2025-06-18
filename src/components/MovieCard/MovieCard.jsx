import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie, onClick }) => {
    return (
    <div className="movie-card" onClick={onClick}>
        <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        />
        <h4>{movie.title}</h4>
        <p>⭐ {movie.vote_average.toFixed(1)}</p>
    </div>
    );
};

export default MovieCard;