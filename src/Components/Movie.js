import React from 'react';
import '../styles/movie.css';

export function Movie(props) {
  const { movie } = props;

  return (
    <div className='movie'>
      <img className='poster' src={movie.Poster} alt={movie.Title} />
      <span>
        {movie.Title} - ({movie.Year})
      </span>
    </div>
  );
}
