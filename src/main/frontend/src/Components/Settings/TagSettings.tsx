import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

import SearchComponent from '../General/SearchComponent';

function TagSettings(){
    const onSearch = () => {

    };

    return (
        <React.Fragment>
            <h2>Tags</h2>
            <hr className="my-4" />
            <Container fluid>
                <SearchComponent onSearch={ onSearch } />
                <Button variant="info">Create</Button>
            </Container>
        </React.Fragment>
    );
};

export default TagSettings;