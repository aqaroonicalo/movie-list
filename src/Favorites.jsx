import { useState } from "react"

import { likedMoviesStore } from "./App"


function Favorites () {
    let likedMovies = likedMoviesStore((state) => state.likedMovies)
    

    return <div> 
        <h1>Liked Movies:</h1>
        <ul>
          {likedMovies.map((movie) => {
            console.log(movie)
            return <li>{movie} </li>;
          })}
        </ul>
    </div>
}

export default Favorites