import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [mode, setMode] = useState("nowPlaying"); // "nowPlaying" or "search"
    const [hasMoreMovies, setHasMoreMovies] = useState(true);

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
            
            // Check if there are more pages available
            setHasMoreMovies(page < data.total_pages);
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
            setMovies(data.results);
            console.log(data.results);
        } catch (err) {
            console.error("Error searching movies: ", err);
        }
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchMovies(nextPage);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            setMode("search");
            searchMovies(searchQuery);
            setHasMoreMovies(false); // Disable load more for search results
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClear = () => {
        setSearchQuery("");
        setMode("nowPlaying");
        setCurrentPage(1);
        setHasMoreMovies(true);
        fetchMovies(1);
    };

    return (
        <main>
            <header>
                <h1>Now Playing Movies</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Search for movies..."
                    />
                    <button onClick={handleSearch}>Search</button>
                    <button onClick={handleClear}>Clear</button>
                </div>
            </header>
            <div className="movie-list">
                {movies.length === 0 && mode === "search" ? (
                    <p className="no-results">No movies found for "{searchQuery}". Try a different search term.</p>
                ) : (
                    movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            posterPath={movie.poster_path}
                            voteAverage={movie.vote_average}
                        />
                    ))
                )}
            </div>
            {mode === "nowPlaying" && hasMoreMovies && (
                <div className="load-more-container">
                    <button onClick={handleLoadMore} className="load-more-btn">
                        Load More
                    </button>
                </div>
            )}
            {mode === "nowPlaying" && !hasMoreMovies && movies.length > 0 && (
                <div className="load-more-container">
                    <p className="no-more-movies">No more movies to show</p>
                </div>
            )}
        </main>
    );
};

export default MovieList;