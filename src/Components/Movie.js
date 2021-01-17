import React from 'react';
import '../styles/movie.css';

export function Movie(props) {
  const { movie, nominated, nominateMovie } = props;
  const shopifyLogo =
    'https://assets.website-files.com/5cfadf19b0ec9084a96f7520/5d6911e18cc2810c3cae3274_shopify-logo-600x600.jpg';

  // Function to add movie to nominated array
  function setNominated(e) {
    let movieId = e.target.parentElement.parentElement.id;
    nominateMovie(movieId);
  }

  //Function to manage poster display
  function displayPoster() {
    if (movie.Poster === 'N/A') {
      return <img className='poster' src={shopifyLogo} alt={movie.Title} />;
    } else {
      return <img className='poster' src={movie.Poster} alt={movie.Title} />;
    }
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
        {displayPoster()}
        <div className='title'>
          {movie.Title} ({movie.Year})
        </div>
        <div>{isNominated()}</div>
      </div>
    </>
  );
}
