import React, { useState } from 'react';
import '../Styles/Search.css';

const SearchComponent = ({onSearch}) => {
    const handleInputChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div class="container mt-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" aria-label="Search" id="searchInput" placeholder="Search" onChange={handleInputChange}/>
            </div>
        </div>
    );
};

export default SearchComponent;