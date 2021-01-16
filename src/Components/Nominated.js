import React from 'react';

export function Nominated(props) {
  const { movie } = props;

  return (
    <>
      <div className='nom-movie' id={movie.imdbID}>
        <img className='nom-poster' src={movie.Poster} alt={movie.Title} />
        <div className='title-button'>
          <div className='title'>
            {movie.Title} ({movie.Year})
          </div>
          <div>
            <button className='nominated'>Remove</button>
          </div>
        </div>
      </div>
    </>
  );
}
