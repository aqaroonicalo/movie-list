import { useState } from 'react'
import './App.css'
import MovieCards  from './MovieCards'
import Favorites  from './Favorites'

import { create } from 'zustand'

export const likedMoviesStore = create((set) => ({
  count: 0,
  likedMovies: [],
  addLike: (movieTitle) => set((state) => {
    const updatedLikedMovies = [...state.likedMovies, movieTitle];
    console.log(updatedLikedMovies);
    return { likedMovies: updatedLikedMovies };

  } ),
  removeLike: (movieTitle) => 
    set((state) => {
      const updatedLikedMovies = state.likedMovies.filter(movie => movie !== movieTitle);
      console.log(updatedLikedMovies);
      return { likedMovies: updatedLikedMovies };
  
    } )
}))

function App() {

  

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center my-4">Movie App</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-7">
          <div className="p-3 rounded shadow-sm bg-light" style={{ borderRadius: '15px', overflowY: 'auto', maxWidth: '' }}>
            <h2 className="text-center">Movie List</h2>
            <MovieCards />
          </div>
        </div>
        <div className="col-sm-5">
          <div className="p-3 rounded shadow-sm bg-light" style={{ borderRadius: '15px', overflowY: 'auto', maxHeight: '500px' }}>
            <h2 className="text-center">Liked Movies</h2>
            <Favorites />
          </div>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default App

