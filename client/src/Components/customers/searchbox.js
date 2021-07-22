import React from 'react';

const SearchBox = ({placeholder,handleChange}) => {
    return (
        <input type='search'
        className="searchBox"
        placeholder={placeholder}
        onChange={handleChange} />
      );
}
 
export default SearchBox