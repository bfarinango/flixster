import React, { useState } from "react";
import "./MovieModal.css";

const MovieModal = ({ show, onClose, movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  if (!show) return null;

  const getTrailerKey = () => {
    if (!movie?.videos?.results) return null;
    
    const trailer = movie.videos.results.find(
      video => video.type === "Trailer" && video.site === "YouTube"
    );
    return trailer ? trailer.key : null;
  };

  const handleTrailerClick = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  const handleModalClose = () => {
    setShowTrailer(false);
    onClose();
  };

  const trailerKey = getTrailerKey();

  return (
    <div className="modal" onClick={handleModalClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button onClick={handleModalClose}>×</button>
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

              {trailerKey && !showTrailer && (
                <div className="trailer-section">
                  <div className="trailer-thumbnail" onClick={handleTrailerClick}>
                    <img 
                      src={`https://img.youtube.com/vi/${trailerKey}/maxresdefault.jpg`}
                      alt={`${movie.title} trailer`}
                      className="trailer-image"
                    />
                    <div className="play-button">
                      <div className="play-icon">▶</div>
                    </div>
                  </div>
                </div>
              )}

              {trailerKey && showTrailer && (
                <div className="trailer-section">
                  <div className="trailer-container">
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                      title={`${movie.title} trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <button className="close-trailer-btn" onClick={handleCloseTrailer}>
                    Close Trailer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;