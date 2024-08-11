import { useState } from 'react'
import './App.css'
import MovieCards  from './MovieCards'

import { create } from 'zustand'

const useStore = create((set) => ({
  movies: 0,
  
}))

function App() {

  

  return (
    <MovieCards/>
  )
}

export default App
