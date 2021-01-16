import React from 'react';
import '../styles/nominations.css';

export function Nominated(props) {
  const { movie, removeNomination } = props;

  //Function to remove nominated movie from nomination list
  function removeNom(e) {
    let movieId = e.target.parentElement.parentElement.parentElement.id;
    removeNomination(movieId);
  }

  return (
    <>
      <div className='nom-movie' id={movie.imdbID}>
        <img className='nom-poster' src={movie.Poster} alt={movie.Title} />
        <div className='title-button'>
          <div className='title'>
            {movie.Title} ({movie.Year})
          </div>
          <div>
            <button className='nominated' onClick={(e) => removeNom(e)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
