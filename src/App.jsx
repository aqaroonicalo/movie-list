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
    <div id='mainmenu'>

      <div>
      <MovieCards/>

      </div>
      <div>

      <Favorites />
      </div>
    </div>
    </>
  )
}

export default App

