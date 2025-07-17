import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'
import { updateSearchCount } from './appwrite'


const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers : {
    accept : 'application/json',
    Authorization : `Bearer ${API_KEY}`
  }
}

const App = () => {
  const[searchTerm, setSearchTerm] = useState('');
  const[errorMessage, setErrorMessage] = useState('');
  const[movieList, setMovieList] = useState([])
  const[isLoading, setIsLoading] = useState(false)
  const[debouncedSearchTerm, setDebounceSearchTerm] = useState('')

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500,[searchTerm])


  const fetchMovies = async (query = '') => {

    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok) {
      throw new Error('Failed to fetch Data')
    }
    
    const data = await response.json();

    if(data.Response === false){
      setErrorMessage(data.Error || 'Failed to fetch Movies')
      setMovieList([]);
      return;
    }

    setMovieList(data.results || [])

    updateSearchCount();

    }

    catch(error){
      console.error(`Error fetching Movies : ${error}`)
      setErrorMessage('Error Fetching movies... Please try again later...')
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(()=> {
    fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm])
  return (
  <main>
    <div className='pattern' />
    <div className="wrapper">
      <header>
        <img src="./hero.png" alt="Hero Banner"/>
        <h1>Search <span className='text-gradient'>Movies</span> You'll Enjoy without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* <h1 className='text-white'>{searchTerm}</h1> */}
      </header>

      <section className='all-movies'>
        <h2 className='mt-[40px]'>All Movies</h2>

        {isLoading ? (
          <Spinner />
        ): errorMessage ? (
          <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <ul>
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie}/>
            ))}
          </ul>
        )}
      </section>
      
    </div>
  </main>
  )
}

export default App