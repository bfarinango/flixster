import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async (page = 1) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`
            );
            const data = await response.json();
            
            if (page === 1) {
                setMovies(data.results);
            } else {
                setMovies(prevMovies => [...prevMovies, ...data.results]);
            }
            setTotalPages(data.total_pages);
            console.log(data.results);
        } catch (err) {
            console.error("Error fetching movies: ", err);
        }
    };

    const searchMovies = async (query) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${query}`
            );
            const data = await response.json();
            setSearchResults(data.results);
            console.log("Search results:", data.results);
        } catch (err) {
            console.error("Error searching movies: ", err);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            searchMovies(searchQuery);
            setIsSearchMode(true);
        }
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= totalPages) {
            setCurrentPage(nextPage);
            fetchMovies(nextPage);
        }
    };

    const handleShowNowPlaying = () => {
        setIsSearchMode(false);
        setSearchQuery("");
        setCurrentPage(1);
        fetchMovies(1);
    };

    const handleShowSearch = () => {
        setIsSearchMode(true);
    };

    const displayedMovies = isSearchMode ? searchResults : movies;
    const showLoadMore = !isSearchMode && currentPage < totalPages;

    return (
        <main>
            <header>
                <h1>Flixster</h1>
                <div className="view-toggle">
                    <button 
                        className={!isSearchMode ? "active" : ""} 
                        onClick={handleShowNowPlaying}
                    >
                        Now Playing
                    </button>
                    <button 
                        className={isSearchMode ? "active" : ""} 
                        onClick={handleShowSearch}
                    >
                        Search
                    </button>
                </div>
                <form className="search-bar" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search for movies..."
                    />
                    <button type="submit">Search</button>
                </form>
            </header>
            
            <div className="movie-list">
                {displayedMovies.length > 0 ? (
                    displayedMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            posterPath={movie.poster_path}
                            voteAverage={movie.vote_average}
                        />
                    ))
                ) : (
                    <p className="no-results">
                        {isSearchMode 
                            ? "No movies found. Try searching for a different title."
                            : "Loading movies..."
                        }
                    </p>
                )}
            </div>

            {showLoadMore && (
                <div className="load-more-container">
                    <button className="load-more-btn" onClick={handleLoadMore}>
                        Load More
                    </button>
                </div>
            )}
        </main>
    );
};

export default MovieList;