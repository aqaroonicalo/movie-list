import { useState } from "react";
import { useEffect } from "react";
import './MovieCards.css'
import { useStore } from "zustand";
import { likedMoviesStore } from "./App";


export function MovieCard(props) {
    let [info, setInfo] = useState({})
    let [liked, setLike] = useState(false)

    useEffect(() => {

        (async () => { const url = `https://www.omdbapi.com/?i=` + props.data.imdbID + `&apikey=881763cb`
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                }
                info = await response.json()
                console.log(info)
                setInfo(info)
            } catch (error) {
                console.error(error.message)
            }})()
    },[])

    const addLike = likedMoviesStore((state) => state.addLike)
    const removeLike = likedMoviesStore((state) => state.removeLike)

    function handleLike(title) {
        
        if (!liked) {
            addLike(title)
            setLike(true)
        }else {
            removeLike(title)
            setLike(false)
        }
    }


    return <div id="moviecard"> <li key={props.data.imdbID}> <img id="movieposter" src={info.Poster}></img> <h2 className="movietitle">{props.data.Title}</h2>
         <p className="moviedescription">

            {info.Plot}
        
        </p>
        <button onClick={() => handleLike(props.data.Title)} > {liked ? ' LIKED!': 'Click To Like'}</button>
        </li>
    </div>
}
function List(props) {
    if (!props.movies) {
        return <div> Loading...</div>
    }
    if (props.movies.length === 0) {

        return <div>No movies loaded</div>
    }
    return (
        <ul>
          {props.movies.map((movie) => {
            console.log(movie)
            return <MovieCard data={movie}/>;
          })}
        </ul>
      );
}

function MovieCards() {
    let [movieData, setMovieData] = useState({})
    
    useEffect(() => {
        
        (async () => { const url = "https://www.omdbapi.com/?s=SUPERMAN&apikey=881763cb"
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            movieData = await response.json()
            setMovieData(movieData)
        } catch (error) {
            console.error(error.message)
        }})()
    }, [])

    
    return (
        <div>
            <h1>Movies: </h1>
            <List movies={movieData.Search}/>
        </div>
    );
}
export default MovieCards;