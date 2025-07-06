import React, { useEffect, useState } from 'react'
import Search from './components/Search'

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  header : {
    accept : 'applications/json',
    Authorization : `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessahe, setErrorMessage] = useState('');
  const fetchMovies = async () => {
    try {

    } 
    catch(error){
      console.error(`Error fetching Movies : ${error}`)
      setErrorMessage('Error Fetching movies... Please try again later...')
    }
  }

  useEffect(()=> {},[])
  return (
  <main>
    <div className='pattern' />
    <div className="wrapper">
      <header>
        <img src="./hero.png" alt="Hero Banner"/>
        <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* <h1 className='text-white'>{searchTerm}</h1> */}
      </header>

      
    </div>
  </main>
  )
}

export default App