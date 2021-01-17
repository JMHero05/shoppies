import React from 'react';
import '../styles/nominations.css';

export function Nominated(props) {
  const { movie, removeNomination } = props;
  const shopifyLogo =
    'https://assets.website-files.com/5cfadf19b0ec9084a96f7520/5d6911e18cc2810c3cae3274_shopify-logo-600x600.jpg';

  //Function to remove nominated movie from nomination list
  function removeNom(e) {
    let movieId = e.target.parentElement.parentElement.parentElement.id;
    removeNomination(movieId);
  }

  //Function to manage poster display
  function displayPoster() {
    if (movie.Poster === 'N/A') {
      return <img className='nom-poster' src={shopifyLogo} alt={movie.Title} />;
    } else {
      return (
        <img className='nom-poster' src={movie.Poster} alt={movie.Title} />
      );
    }
  }

  return (
    <>
      <div className='nom-movie' id={movie.imdbID}>
        {displayPoster()}
        <div className='title-button'>
          <div>
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
