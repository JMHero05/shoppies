import React from 'react';
import '../styles/movie.css';

export function Movie(props) {
  const { movie, nominated, nominateMovie } = props;

  // Function to add movie to nominated array
  function setNominated(e) {
    let movieId = e.target.parentElement.parentElement.id;
    nominateMovie(movieId);
  }

  // Function to check if movie is nominated and disable buttons
  function isNominated() {
    if (nominated.some((nom) => nom.imdbID === movie.imdbID)) {
      return (
        <button
          className='nominate'
          disabled={true}
          onClick={(e) => setNominated(e)}>
          Nominated!
        </button>
      );
    } else if (nominated.length === 5) {
      return null;
    } else {
      return (
        <button
          className='nominate'
          disabled={false}
          onClick={(e) => setNominated(e)}>
          Nominate?
        </button>
      );
    }
  }

  return (
    <>
      <div className='movie' id={movie.imdbID}>
        <img className='poster' src={movie.Poster} alt={movie.Title} />
        <div className='title'>
          {movie.Title} ({movie.Year})
        </div>
        <div>{isNominated()}</div>
      </div>
    </>
  );
}
