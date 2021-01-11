import React, { Component } from 'react';
import { SearchForm } from './Components/SearchForm';
import { MoviesContainer } from './Containers/MoviesContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
      <div className='App'>
        <h1>The Shoppies</h1>
        <SearchForm handleSubmit={this.handleSubmit} />
        <MoviesContainer movies={this.state.data} />
      </div>
    );
  }
}

export default App;
