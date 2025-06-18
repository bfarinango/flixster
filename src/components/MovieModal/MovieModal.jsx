import React from "react";
import "./MovieModal.css";

const MovieModal = ({ show, onClose, movie }) => {
    if (!show) return null;

    return (
    <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
            <button onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
            {!movie ? (
            <p>Loading...</p>
            ) : (
            <div className="details">
                <h2>{movie.title}</h2>
                <img 
                className="backdrop-image"
                src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} 
                alt={movie.title}
                />
                <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                <p><strong>Release Date:</strong> {movie.release_date}</p>
                
                <h3>Genres</h3>
                <div className="genres-section">
                <ul>
                    {movie.genres?.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                    ))}
                </ul>
                </div>
                
                <h3>Overview</h3>
                <div className="overview-section">
                <p>{movie.overview}</p>
                </div>
                
                <p style={{textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1.5rem'}}>
                ⭐ {movie.vote_average.toFixed(1)}
                </p>
            </div>
            )}
        </div>
        </div>
    </div>
    );
};

export default MovieModal;