import React, { useState } from 'react';

const SearchComponent = ({data, onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch =  (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const results = data.filter(entry => entry.name.toLowerCase().includes(term.toLowerCase()) || entry.description.toLowerCase.includes(term.toLowerCase()));

        onSearch(results);
    };

    return (
        <div class="container mt-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" aria-label="Search" id="searchInput" placeholder="Search" value={searchTerm} onChange={handleSearch}/>
            </div>
        </div>
    );
};

export default SearchComponent;