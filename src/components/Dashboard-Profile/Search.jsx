import React, { useEffect, useState } from "react"
import { memo } from "react";
import { fetchSearchtoys } from "../Helpers/ToyPromises";

export const SearchTemplate = () => {
 
  
  const [searchItem, setSearchItem] = useState('')
  const [filteredtoys, setFilteredtoys] = useState([])

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
  }

  useEffect(() => {
    if(searchItem === ''){
      setFilteredtoys([])
    } else {
      fetchSearchtoys(searchItem).then(x => setFilteredtoys(x))
    }	
    }, [searchItem]);

  return (
    <>
      <input id="search-input"
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type to search'
      />
      {
        <div id="searchResults">
            <h3>Results:</h3> 
            <ul className={searchItem !== '' ? 'isSearched' : 'notSearched'}>
          {filteredtoys.map(user => <li key={user.id}>{user.name} 
            <img className="searchImg" src={user.imageUrl} /></li>)}
            </ul>
        </div>
      }      
    </>
  )
}
  

export default memo(SearchTemplate);