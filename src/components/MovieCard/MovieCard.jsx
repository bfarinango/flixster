import React from "react";
import "./MovieCard.css";

const MovieCard = ({ title, posterPath, voteAverage }) => {
    return (
    <div className="movie-card">
        <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        />
        <h4>{title}</h4>
        <p>⭐ {voteAverage.toFixed(1)}</p>
    </div>
    );
};

export default MovieCard;