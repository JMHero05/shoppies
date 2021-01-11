import React, { useState } from 'react';

export function SearchForm(props) {
  const [searchTerm, setSearchTerm] = useState('');
  console.log(searchTerm);

  const submitSearchTerm = (e) => {
    e.preventDefault();
    props.handleSubmit(searchTerm);
  };

  return (
    <form onSubmit={submitSearchTerm}>
      <label>
        Search:
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <input type='submit' value='Submit' />
    </form>
  );
}
