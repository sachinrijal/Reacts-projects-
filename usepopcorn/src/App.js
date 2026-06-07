import { useEffect, useState } from "react";
import StarRating from "./starRating.js";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const key = "XXXXX"; // ⚠️⚠️⚠️  use your own api key  

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?&apikey=${key}&s=${query}`,
          {signal:controller.signal}
        );

        if (!res.ok) throw new Error("something went wrong ! ");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movies not found ! ");
        
        
        setMovies(data.Search);
      } catch (err) {
        if (err.name !== 'AbortError'){
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    setSelectedId(null);
    fetchMovies();

    return function(){
      controller.abort();
    }
  }, [query]);

  function handleWatchedMovie(movie) {
    setWatched((w) => [...w, movie]);
  }

  function handleDelete(mov){
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== mov.imdbID));
  }

  return (
    <>
      <Navbar>
        <Input query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isloading && <Loader />}
          {!isloading && !error && (
            <MovieList
              movies={movies}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              onadd={handleWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                setWatched={setWatched}
                selectedId={selectedId}
                onDelete = {handleDelete}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading... </p>;
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Input({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

function MovieDetails({ selectedId, setSelectedId, onadd, watched }) {
  const [movie, setMovie] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [userRating, onUserRating] = useState("");
  const isWatched = watched.slice().map((movie) => movie.imdbID).includes(selectedId);
  const watchedMovieRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

  const {
    Title,
    Year,
    Poster,
    imdbRating,
    Runtime,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
  } = movie;

  function handleClick() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      async function MovieDetail() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?&apikey=${key}&i=${selectedId}`,
        );
        const data = await res.json();
        setIsLoading(false);
        setMovie(data);
      }
      MovieDetail();
    },
    [selectedId],
  );

  useEffect(function(){

    function EscEventHandler(e) {
      if (e.code === 'Escape'){
        setSelectedId(null);
      }
    }
    document.addEventListener('keydown' , EscEventHandler);

    return function() {
      document.removeEventListener('keydown' , EscEventHandler);
    }

  } , [setSelectedId])

  useEffect(function () {
    if (!Title) return ; 
    document.title =`movie | ${Title}`;

    return function (){
      document.title = 'usePopcorn'
    }
  } , [Title])

  function addWatchedMovie() {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title,
      Year,
      Poster,
      userRating,
      imdbRating: Number(imdbRating),
      runtime: Runtime.split(" ").at(0),
    };

    onadd(newWatchedMovie);
    setSelectedId(null);
  }

  return (
    <div className="details">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleClick}>
              &larr;
            </button>
            <img src={Poster} alt={`poster of ${Title}`}></img>

            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}{" "}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMBd rating{" "}
              </p>
            </div>
          </header>

          <section>
            {!isWatched ? (
              <>
                <div className="rating">
                  <StarRating
                    maxRating={10}
                    size="24px"
                    onSetRating={onUserRating}
                  />
                </div>
                {userRating > 0 && (
                  <button className="btn-add" onClick={() => addWatchedMovie()}>
                    Add to the list{" "}
                  </button>
                )}
              </>
            ) : (
              <>
              <div className="rating"> <p>You have rated this movie { watchedMovieRating } <span>⭐</span></p></div>
              {console.log(userRating)}</>
            )}
            <p>
              <em>{Plot}</em>
            </p>
            <p>{Actors}</p>
            <p>Directed by {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function MovieList({ movies, setSelectedId, selectedId }) {
  function handleClick(id) {
    setSelectedId(selectedId === id ? null : id);
  }
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movies
          movie={movie}
          key={movie.imdbID}
          onClick={() => handleClick(movie.imdbID)}
        />
      ))}
    </ul>
  );
}

function Movies({ movie, onClick }) {
  return (
    <li onClick={onClick}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMoviesSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched?.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, selectedId, setWatched , onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie , onDelete }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button className="btn-delete" onClick={() => onDelete(movie)}>❌</button>
    </li>
  );
}
