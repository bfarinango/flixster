import React from "react";
import "./App.css";
import MovieList from "./components/MovieList/MovieList";

const App = () => {
  return (

    <div className="App">
      <header className="App-header">
        <h1>Flixster</h1>
      </header>

      <main>
        <MovieList />
      </main>

      <footer className="App-footer">
        <p>By: Brianna Farinango</p>
      </footer>
    </div>
  );
};

export default App;