import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchForm } from './Components/SearchForm';
import { MoviesContainer } from './Containers/MoviesContainer';
import { NominationsContainer } from './Containers/NominationsContainer';
import './styles/App.css';

function App() {
  const [data, setData] = useState(null);
  const [nominated, setNominated] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle get request for data from OMDB and set data to API response
  const handleSubmit = (searchTerm) => {
    fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        setData(data.Search);
      })
      .catch((error) => {
        setErrorMessage(error);
        console.error('There was an error!', errorMessage);
      });
  };

  // Function to add clicked movie to nominated array
  const nominateMovie = (movieId) => {
    const nominatedMovies = [...nominated];
    const nominatedMovie = data.find((movie) => movie.imdbID === movieId);

    nominatedMovies.push(nominatedMovie);
    setNominated(nominatedMovies);
  };

  // Function to remove clicked movie from nominated array
  const removeNomination = (movieId) => {
    const nominatedMovies = [...nominated];
    const removedMovie = nominated.findIndex(
      (movie) => movie.imdbID === movieId
    );

    nominatedMovies.splice(removedMovie, 1);
    setNominated(nominatedMovies);
  };

  // Function for banner display when nominations reach 5
  const displayBanner = () => {
    if (nominated.length === 5) {
      return (
        <div id='banner'>
          <div>You have nominated 5 movies, which is the maximum allowed.</div>
          <div>
            To nominate another movie, remove one nomination from your
            Nominations list.
          </div>
        </div>
      );
    }
  };

  // Function for flexible of Movies and Nominations styling
  const displaySearchResults = () => {
    if (nominated.length > 0) {
      return (
        <>
          <div className='results'>
            <MoviesContainer
              movies={data}
              nominated={nominated}
              nominateMovie={nominateMovie}
            />
          </div>
          <div className='nominations'>
            <NominationsContainer
              movies={nominated}
              removeNomination={removeNomination}
            />
          </div>
        </>
      );
    } else {
      return (
        <div className='results-nominations'>
          <MoviesContainer
            movies={data}
            nominated={nominated}
            nominateMovie={nominateMovie}
          />
        </div>
      );
    }
  };

  return (
    <div className='App'>
      {displayBanner()}
      <h1>The Shoppies</h1>
      <SearchForm handleSubmit={handleSubmit} />
      <div className='wrapper'>{displaySearchResults()}</div>
    </div>
  );
}

export default App;
