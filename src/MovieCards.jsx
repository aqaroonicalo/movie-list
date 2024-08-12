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


    return <li className="card" style={{ width: 'auto', margin: '10px', padding: '5px' }} key={props.data.imdbID}>
    <div className="d-flex">
      <div style={{ flex: '0 0 auto', width: '50%', marginRight: '', display: 'flex', justifyContent: 'center' }}>
        <img
          src={info.Poster}
          alt="Card image cap"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>
      <div style={{ flex: '1 1 auto' }}>
        <div className="card-body p-0">
          <h5 className="card-title mb-2" style={{ fontSize: '1rem', marginBottom: '5px' }}>{props.data.Title}</h5>
          <p className="card-text mb-2" style={{ fontSize: '0.9rem', marginBottom: '5px' }}>{info.Plot}</p>
          <button onClick={() => handleLike(props.data.Title)} className= {liked ? "btn btn-danger btn-sm" : "btn btn-primary btn-sm"} id="likebutton">
            {liked ? 'LIKED!' : 'Click To Like'}
          </button>
        </div>
      </div>
    </div>
  </li>
}
function List(props) {
    if (!props.movies) {
        return <div> Loading...</div>
    }
    if (props.movies.length === 0) {

        return <div>No movies loaded</div>
    }
    return (
        <ul >
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
            <List movies={movieData.Search}/>
        </div>
    );
}
export default MovieCards;