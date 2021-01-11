import React from 'react';
import { Movie } from '../Components/Movie';

export function MoviesContainer(props) {
  const { movies } = props;
  console.log(movies);
  return (
    <>
      <h1>Movies Container</h1>
      <div id='movies'>
        {movies &&
          movies.map((movie) => <Movie movie={movie} key={movie.imdbID} />)}
      </div>
    </>
  );
}
