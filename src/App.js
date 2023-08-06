import React, { useState } from "react";

import "./App.css";
import MovieList from "./Components/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);
  const[isLoading,setIsLoading]=useState(false);
  async function fetchmovieHandler() {
    setIsLoading(true);
    const response = await fetch(" https://swapi.dev/api/films/");
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
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchmovieHandler}>Fetch Movie</button>
      </section>
      <section>
        {!isLoading &&<MovieList movies={movies} />}
        {isLoading &&<p>isLoading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
