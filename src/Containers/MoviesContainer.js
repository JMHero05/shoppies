import React from 'react';
import { Movie } from '../Components/Movie';
import '../styles/movies.css';

export function MoviesContainer(props) {
  const { movies, nominated } = props;

  return (
    <>
      {movies ? (
        <>
          <div id='movies'>
            {movies &&
              movies.map((movie) => (
                <Movie
                  movie={movie}
                  nominated={nominated}
                  nominateMovie={props.nominateMovie}
                  key={movie.imdbID}
                />
              ))}
          </div>
        </>
      ) : null}
    </>
  );
}
