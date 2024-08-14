import { useState } from 'react'
import './App.css'
import MovieCards  from './MovieCards'
import Favorites  from './Favorites'
import { Search } from './Search'

import { create } from 'zustand'

export const searchStore = create((set) =>
  ({
    searchTerm: '',
    setTerm: (newTerm) => set((state) => {
      console.log(newTerm);
      return {searchTerm: newTerm};
    })
  })
)

export const likedMoviesStore = create((set) => ({
  count: 0, 
  likedMovies: [],
  addLike: (addedMovie) => set((state) => {
    addedMovie.fav = true
    const updatedLikedMovies = [...state.likedMovies, addedMovie];
    console.log(updatedLikedMovies);
    return { ...state, likedMovies: updatedLikedMovies };

  } ),
  removeLike: (removedMovie) => 
    set((state) => {
      removedMovie.fav = false
      const updatedLikedMovies = state.likedMovies.filter(movie => movie.imdbID !== removedMovie.imdbID);
      console.log(updatedLikedMovies);
      return { ...state, likedMovies: updatedLikedMovies};
  
    } )
}))

function App() {

  

  return (
    <>
    <div className="container-fluid">
      <div className="row ">
        <div className="col-4">
          <h1 className="text-center my-4">Movie App</h1>
        </div>
        <div className="col-2">
          <h1 className="text-center my-4">Search: </h1>
        </div>
        <div className="col-2">
          <Search />
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-sm-4">
          <div className="bg-light" style={{ border: 'solid, black, 2px',borderRadius: '30px', overflowY: 'auto', maxWidth: 'auto' }}>
            <h2 className="text-center">Movie List</h2>
            <MovieCards />
          </div>
        </div>
        <div className="col-sm-3">
          <div className="bg-light" style={{ border: 'solid, black, 2px', borderRadius: '15px', overflowY: 'auto', maxHeight: 'auto' }}>
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

