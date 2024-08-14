import { useState } from "react"

import { likedMoviesStore } from "./App"


function Favorites () {
    let likedMovies = likedMoviesStore((state) => state.likedMovies)
    

    return <div className="container mt-4 mb-4">
    {likedMovies.length === 0 ? (
      <p>No favorites yet.</p>
    ) : (
      <ul className="list-group">
        {likedMovies.map((movie) => {
          console.log(movie);
          return (
            <li key={likedMovies.indexOf(movie)} className="list-group-item d-flex justify-content-between align-items-center font-weight-bold  ">
              {movie.Title}
              <span className="badge badge-primary badge-pill">★</span>
            </li>
          );
        })}
      </ul>
    )}
  </div>
}

export default Favorites