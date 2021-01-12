import React from 'react';
import { Movie } from '../Components/Movie';
import '../styles/movies.css';

export function MoviesContainer(props) {
  const { movies } = props;
  console.log(movies);
  return (
    <>
      {movies ? (
        <>
          <h1>Search Results</h1>
          <div id='movies'>
            {movies &&
              movies.map((movie) => <Movie movie={movie} key={movie.imdbID} />)}
          </div>
        </>
      ) : null}
    </>
  );
}
