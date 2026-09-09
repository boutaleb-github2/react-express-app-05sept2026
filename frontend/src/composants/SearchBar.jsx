import { useState, useEffect } from "react";

function SearchBar ({onSearchChange,search,onReset}) {
    return (
        <div>
        <label htmlFor="search">
            Rechercher :
            <input id="search" type="text" name="search" value={search} onChange={(e)=>onSearchChange(e.target.value)}/> 
        </label>
        <button style={{color:"red"}} onClick={onReset}>Reset</button>
      </div>   
    )
}

export default SearchBar;