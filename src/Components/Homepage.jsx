import Navbar from './Navbar'
import { useState } from 'react'
import UserGallery from './UserGallery'
const Homepage = () => {
  const [query, setQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState('');

  const handleSearch = () => {
    setSearchedQuery(query); // Set the search query for SearchedGallery
  };
  return (
    <div className="page">
    <nav className="navbar">
      <Navbar/> 
     </nav>
     <main className="mainBody">
        <div className="search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        </div>

        <UserGallery query={searchedQuery} />
      </main>
     </div>
  )
}

export default Homepage