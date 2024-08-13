import { useState } from "react";
import { useEffect } from "react";
import './MovieCards.css'
import { useStore } from "zustand";
import { likedMoviesStore, searchStore } from "./App";


export function MovieCard(props) {
    // console.log("FROM movie card")
    // console.log(props.data)
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
                //console.log(info)
                setInfo(info)
            } catch (error) {
                console.error(error.message)
            }})()
    },[])


    const addLike = likedMoviesStore((state) => state.addLike)
    const removeLike = likedMoviesStore((state) => state.removeLike)
    

    function handleLike(movie) {
        // console.log(movie)
        if (!movie.fav) {
            addLike(movie)
        }else {
            removeLike(movie)
        }
    }


        return<>
            <div class="movie_card" id="bright">
                <div class="info_section">
                    <div class="movimage">
                        <img class="locandina" src={info.Poster} />
                    </div>
                    <div class="movinfo">

                            <h1>{info.Title}</h1>
                            
                            <h4>{info.Year}, {info.Director}</h4>
                            <span class="minutes">{info.Runtime}</span>
                            <p class="type">{info.Genre}</p>
                            <div class="movie_desc">
                            <p class="text">
                                {info.Plot}
                            </p>

                            </div>
                            <div class="movsocial">
                        <ul>
                                <button onClick={() => handleLike(props.data)} className={props.data.fav ? "btn btn-danger btn-sm" : "btn btn-primary btn-sm"} id="likebutton">
                                    {props.data.fav ? 'LIKED!' : 'Click To Like'}
                                </button>
                        </ul>
                    </div>
                    </div>
                    
                    
                </div>
            </div>
        </>
//     return <li className="card" style={{ width: 'auto', margin: '10px', padding: '5px' }} >
//     <div className="d-flex">
//       <div style={{ flex: '0 0 auto', width: '50%', marginRight: '', display: 'flex', justifyContent: 'center' }}>
//         <img
//           src={info.Poster}
//           alt="Card image cap"
//           style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
//         />
//       </div>
//       <div style={{ flex: '1 1 auto' }}>
//         <div className="card-body p-0">
//           <h5 className="card-title mb-2" style={{ fontSize: '1rem', marginBottom: '5px' }}>{props.data.Title}</h5>
//           <p className="card-text mb-2" style={{ fontSize: '0.9rem', marginBottom: '5px' }}>{info.Plot}</p>
//           <button onClick={() => handleLike(props.data)} className= {props.data.fav ? "btn btn-danger btn-sm" : "btn btn-primary btn-sm"} id="likebutton">
//             {props.data.fav ? 'LIKED!' : 'Click To Like'}
//           </button>
//         </div>
//       </div>
//     </div>
//   </li>
}
function List(props) {
    if (!props.movies) {
        return <div> Loading...</div>
    }
    if (props.movies.length === 0) {

        return <div>No movies loaded</div>
    }
    return (
        <ul class="cardlist">
          {props.movies.map((movie) => {
            //console.log(movie)
            return <MovieCard key={movie.imdbID} data={movie}/>;
          })}
        </ul>
      );
}

function MovieCards() {
    let [movieData, setMovieData] = useState({})
    let searchTerm = searchStore((state) => state.searchTerm)
    const likedMovies = likedMoviesStore((state) => state.likedMovies)
    useEffect(() => {
        
        (async () => {
            console.log(searchTerm)
            let searchurlkey = searchTerm ==='' ? 'superman' : searchTerm;
            // let url = "https://www.omdbapi.com/?s=" + searchTerm === '' ? 'superman': searchTerm + "&apikey=881763cb"
            let url = "https://www.omdbapi.com/?s=" + searchurlkey + "&apikey=881763cb"
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            movieData = await response.json()
            movieData.Search = movieData.Search.map((movie)=>{
                return {
                    ...movie,
                    fav: likedMovies.some((likedmovie) => likedmovie.imdbID === movie.imdbID)
                }
            })
            setMovieData(movieData)
        } catch (error) {
            console.error(error.message)
        }})()
    }, [searchTerm])

    
    return (
        <div>
            <List movies={movieData.Search}/>
        </div>
    );
}
export default MovieCards;