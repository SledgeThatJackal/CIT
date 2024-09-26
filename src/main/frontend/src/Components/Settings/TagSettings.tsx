import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, FormControl, InputGroup, Form } from 'react-bootstrap';

import { Tag } from '../../Types/Tag';
import TagBadge from '../Tag/TagBadge';

function TagSettings(){
    const [tags, setTags] = useState<Tag[]>([]);

    const fetchData = async () => {
        try{
            const response = await axios.get<Tag[]>(`/api/tags`);

            setTags(response.data);
        } catch (error) {
            console.error('Request failed: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onSearch = () => {

    };

    return (
        <React.Fragment>
            <h2>Tags</h2>
            <hr className="my-4" />
            <Container fluid>
                <Row className="pb-3">
                    <Col>
                        <FormControl type="text" aria-label="Search" id="searchInput" placeholder="Search..." onChange={ onSearch }></FormControl>
                    </Col>
                    <Col>
                        <Button variant="success">Create</Button>
                    </Col>
                </Row>
                <Row className="border border-dark p-3 rounded-top bg-success">
                    Total Tags: { tags.length || 0 }
                </Row>
                {tags.length > 0 && tags.map((tag, index) => (
                    <Row key={`tagRow-${index}`} className="border border-dark bg-primary pt-3 pb-3">
                        <Col className="d-flex align-items-center me-auto">
                            <TagBadge tag={ tag } />
                            : { tag.description }
                        </Col>
                        <Col>
                        <InputGroup>
                            <Button type="button" variant="info">Edit</Button>
                            <Button type="button" variant="danger">Delete</Button>
                        </InputGroup>
                        </Col>
                    </Row>
                ))}
            </Container>
        </React.Fragment>
    );
};

export default TagSettings;