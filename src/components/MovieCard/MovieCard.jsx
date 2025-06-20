import React from "react";
import { AiFillHeart, AiOutlineHeart, AiFillEye, AiOutlineEye } from "react-icons/ai";
import "./MovieCard.css";

const MovieCard = ({ movie, onClick, isFavorite, isWatched, onToggleFavorite, onToggleWatched }) => {
    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        onToggleFavorite();
    };

    const handleWatchedClick = (e) => {
        e.stopPropagation();
        onToggleWatched();
    };

    return (
        <div className="movie-card" onClick={onClick}>
            <div className="movie-icons">
                <button 
                    className={`favorite-btn ${isFavorite ? 'favorite-active' : ''}`}
                    onClick={handleFavoriteClick}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>
                <button 
                    className={`watched-btn ${isWatched ? 'watched-active' : ''}`}
                    onClick={handleWatchedClick}
                    aria-label={isWatched ? "Mark as unwatched" : "Mark as watched"}
                >
                    {isWatched ? <AiFillEye /> : <AiOutlineEye />}
                </button>
            </div>
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