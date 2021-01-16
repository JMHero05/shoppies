import React, { Component } from 'react';
import { SearchForm } from './Components/SearchForm';
import { MoviesContainer } from './Containers/MoviesContainer';
import { NominationsContainer } from './Containers/NominationsContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      nominated: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.nominateMovie = this.nominateMovie.bind(this);
    this.removeNomination = this.removeNomination.bind(this);
  }

  // Function to handle get request for data from OMDB and set this.state.data to API response
  handleSubmit(searchTerm) {
    fetch(
      `http://www.omdbapi.com/?s=${searchTerm}&page=1-2&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.setState({ data: data.Search });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
  }

  // Function to add clicked movie to nominated array
  nominateMovie(movieId) {
    const nominatedMovies = [...this.state.nominated];
    const nominatedMovie = this.state.data.find(
      (movie) => movie.imdbID === movieId
    );

    nominatedMovies.push(nominatedMovie);
    this.setState({ nominated: nominatedMovies });
  }

  // Function to remove clicked movie from nominated array
  removeNomination(movieId) {
    const nominatedMovies = [...this.state.nominated];
    const removedMovie = this.state.nominated.findIndex(
      (movie) => movie.imdbID === movieId
    );

    nominatedMovies.splice(removedMovie, 1);
    this.setState({ nominated: nominatedMovies });
  }

  render() {
    return (
      <div className='App'>
        <h1>The Shoppies</h1>
        <SearchForm handleSubmit={this.handleSubmit} />
        <div className='wrapper'>
          <div className='results'>
            <MoviesContainer
              movies={this.state.data}
              nominated={this.state.nominated}
              nominateMovie={this.nominateMovie}
            />
          </div>
          <div className='nominations'>
            <NominationsContainer
              movies={this.state.nominated}
              removeNomination={this.removeNomination}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
