import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
    const fetchMovies = async () => {
        try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}`
        );
        const data = await response.json();
        setMovies(data.results);
        console.log(data.results);
        } catch (err) {
        console.error("Error fetching movies: ", err);
        }
    };
    fetchMovies();
    }, []);

    return (
    <main>
        <header>
        <h1>Now Playing Movies</h1>
        </header>
        <div className="movie-list">
        {movies.map((movie) => (
            <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
            />
        ))}
        </div>
    </main>
    );
};

export default MovieList;