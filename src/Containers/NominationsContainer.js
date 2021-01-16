import React from 'react';
import { Nominated } from '../Components/Nominated';

export function NominationsContainer(props) {
  const { movies } = props;

  return (
    <div>
      <h3>Nominations</h3>
      {movies.length > 0
        ? movies.map((movie) => <Nominated movie={movie} key={movie.imdbID} />)
        : null}
    </div>
  );
}
