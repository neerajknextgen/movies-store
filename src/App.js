import React, { useEffect, useState } from 'react';
import './App.css';
import Movie from './Movie';

const featured_api = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const img_api = "https://image.tmdb.org/t/p/w1280";

const search_api = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getMovies(featured_api);
  }, []);

  function getMovies(API) {
    fetch(API).then(res => res.json())
    .then(data => {
      setMovies(data.results);
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (searchTerm) {
      getMovies(search_api + searchTerm);
      setSearchTerm('');
    }
  }

  function handleOnChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div>
      <header className="header">
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>

      <div className="movie-container">
        {movies.length > 0 ? movies.sort((a, b) => a.vote_average < b.vote_average ? 1 : -1).map(movie =>
          <Movie
            key={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
            overview={movie.overview}
          />) : <div><h2>No results found.</h2></div>}
      </div>
    </div>
  );
}

export default App;
