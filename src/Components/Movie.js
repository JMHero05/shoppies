import React from 'react';
import '../styles/movie.css';

export function Movie(props) {
  const { movie, nominated, nominateMovie } = props;

  // Function to add movie to nominated array
  function setNominated(e) {
    let movieId = e.target.parentElement.parentElement.id;
    nominateMovie(movieId);
  }

  return (
    <>
      <div className='movie' id={movie.imdbID}>
        <img className='poster' src={movie.Poster} alt={movie.Title} />
        <div className='title'>
          {movie.Title} ({movie.Year})
        </div>
        <div>
          <button
            className='nominate'
            disabled={false}
            onClick={(e) => setNominated(e)}>
            Nominate?
          </button>
        </div>
      </div>
    </>
  );
}
