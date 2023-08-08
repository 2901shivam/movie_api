import React, { useCallback, useEffect, useState } from "react";

import "./App.css";
import MovieList from "./Components/MoviesList";
import AddnewMovie from "./Components/AddnewMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const[error,setError]=useState(null);
  const fetchmovieHandler=useCallback(async() =>{
    setIsLoading(true);
    setError(null);
    try{
    
    const response = await fetch(" https://swapi.dev/api/films/");
    if(!response.ok){
      throw new Error('Something went wrong ...retrying');
    }
    const data = await response.json();

    const transformedData = data.results.map((moviesdata) => {
      return {
        id: moviesdata.episode_id,
        title: moviesdata.title,
        openingText: moviesdata.opening_crawl,
        releaseDate: moviesdata.release_date,
      };
    });
    setMovies(transformedData);
    setIsLoading(false);
   
  
  }catch(error){
    setError(error.message);
    setIsLoading(false);

  }
  
},[]);

useEffect(()=>{
  fetchmovieHandler();
},[fetchmovieHandler])

const AddMovieHandler=(movie)=>{
  console.log(movie);
}

let content=<p>no movies found</p>

if(movies.length===0){
  content=<p>{content}</p>;
}

if(movies.length>0){
  content=<MovieList movies={movies}/>
}
if(error){
  content=<p>{error}</p>
}
if(isLoading){
  content=<p>Loading...</p>
}

  return (
    <React.Fragment>
    <section>
      <AddnewMovie onAddMovie={AddMovieHandler}/>
    </section>
      <section>
        <button onClick={fetchmovieHandler}>Fetch Movie</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
