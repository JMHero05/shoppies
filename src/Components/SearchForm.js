import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/search.css';

export function SearchForm(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const submitSearchTerm = (e) => {
    e.preventDefault();
    props.handleSubmit(searchTerm);
  };

  return (
    <form onSubmit={submitSearchTerm}>
      <input
        type='text'
        value={searchTerm}
        placeholder='Enter a Movie Title'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type='submit' value='Submit'>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}
