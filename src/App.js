import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { SearchForm } from './Components/SearchForm';
import { MoviesContainer } from './Containers/MoviesContainer';
import { NominationsContainer } from './Containers/NominationsContainer';
import './styles/App.css';

// Function to check for cookies
function areThereCookies(cookies) {
  return cookies.nominations ? [...cookies.nominations] : [];
}

function App() {
  const [data, setData] = useState(null);
  const [cookies, setCookie] = useCookies(['nominations']);
  const [nominated, setNominated] = useState(areThereCookies(cookies));

  // Function to handle get request for data from OMDB and set data to API response
  const handleSubmit = (searchTerm) => {
    axios
      .get(
        `https://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
      )
      .then((response) => {
        setData(response.data.Search);
      })
      .catch((error) => {
        console.error(`There was an error! ${error}`);
      });
  };

  // Function to add movie to cookies
  function addCookieNom(nominated) {
    setCookie('nominations', nominated);
  }

  // Function to add clicked movie to nominated array
  const nominateMovie = (movieId) => {
    const nominatedMovies = [...nominated];
    const nominatedMovie = data.find((movie) => movie.imdbID === movieId);

    nominatedMovies.push(nominatedMovie);
    setNominated(nominatedMovies);
    addCookieNom(nominatedMovies);
  };

  // Function to remove clicked movie from nominated array
  const removeNomination = (movieId) => {
    const nominatedMovies = [...nominated];
    const removedMovie = nominated.findIndex(
      (movie) => movie.imdbID === movieId
    );

    nominatedMovies.splice(removedMovie, 1);
    setNominated(nominatedMovies);
    setCookie('nominations', nominatedMovies);
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
          <h2>Nominations</h2>
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
