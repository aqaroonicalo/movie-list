import { useState } from "react";
import { useEffect } from "react";
import './MovieCards.css'


function MovieCard(props) {
    let [info, setInfo] = useState({})

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

    return <div id="moviecard"> <li key={props.data.imdbID}> <h1>{props.data.Title}</h1> <p>

            {info.Plot}
        
        </p></li>
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