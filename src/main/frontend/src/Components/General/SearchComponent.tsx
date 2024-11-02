import React from 'react';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';

import '../../Styles/Search.css';

type searchComponentProp = {
    onSearch: React.Dispatch<React.SetStateAction<string>>;
    toggleCreate: () => void;
};

const SearchComponent = ({ onSearch, toggleCreate }: searchComponentProp) => {
    return (
        <Container className="mt-5">
            <InputGroup className="mb-3">
                <FormControl type="text" aria-label="Search" id="searchInput" placeholder="Search..." onChange={ (e) => onSearch(e.target.value) } />
                <Button variant="info" onClick={ toggleCreate }>Create</Button>
            </InputGroup>
        </Container>
    );
};

export default SearchComponent;