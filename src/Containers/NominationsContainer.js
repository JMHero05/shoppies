import React from 'react';
import { Nominated } from '../Components/Nominated';

export function NominationsContainer(props) {
  const { movies, removeNomination } = props;

  return (
    <>
      {movies.length > 0
        ? movies.map((movie) => (
            <Nominated
              movie={movie}
              key={movie.imdbID}
              removeNomination={removeNomination}
            />
          ))
        : null}
    </>
  );
}
