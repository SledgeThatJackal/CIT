import React from 'react';
import '../../Styles/Search.css';

type searchComponentProp = {
    onSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchComponent = ({onSearch}: searchComponentProp) => {
    const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        onSearch(e.target.value);
    };

    return (
        <div className="container mt-5">
            <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="Search" id="searchInput" placeholder="Search" onChange={handleInputChange}/>
            </div>
        </div>
    );
};

export default SearchComponent;