import React, { useState } from 'react';


export function SearchBar(props){
    let setQuery = props.setQuery; 
    let handleSearch = props.handleSearch;
    const searchBarStyle= "position-relative home-searchBar";
    let searchResult = props.searchResult;

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          setQuery(searchResult);
        }
    }

    return (
        <div className={searchBarStyle}>
          <div className="align-item-center justify-content-center px-5">
            <div className="input-group rounded">
              <input type="search" className="form-control rounded" placeholder="Try search 'lake' or '/trail poo poo point'" aria-label="a form for inputing wanted search terms" aria-describedby="search-addon" onChange={handleSearch} onKeyDown={handleKeyDown}/>
              <span className="input-group-text border-0" id="search-addon">
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" aria-label="a button that initiate search" onClick={() => setQuery(searchResult)}>Search</button>
              </span>
            </div>
          </div>
        </div>
    )
}