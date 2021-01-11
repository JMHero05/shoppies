import React from 'react';

export function MoviesContainer(props) {
  console.log(props.movies);
  return (
    <>
      <h1>Movies Container</h1>
      <div id='movies'></div>
    </>
  );
}
