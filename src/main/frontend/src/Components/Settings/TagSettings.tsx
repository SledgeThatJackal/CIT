import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, FormControl, InputGroup, Form } from 'react-bootstrap';

import { Tag } from '../../Types/Tag';
import ConfirmationModal from '../General/ConfirmationModal';
import TagRead from './TagRead';
import TagForm from './TagForm';

function TagSettings(){
    const [tags, setTags] = useState<Tag[]>([]);
    
    // Modal
    const [show, setShow] = useState<boolean>(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);
    const [deleteTag, setDeleteTag] = useState<Tag>();

    // Creation Area
    const [showCreate, setShowCreate] = useState<boolean>(false);

    // Edit Area
    const [editId, setEditId] = useState<number>(-1);

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

    const onCreate = async (data: any) => {
        await axios.post(`/api/tags/create`, data);

        if(showCreate){
            // reset
        } else {
            setShowCreate(false);
        }
    };

    const onEdit = async (data: any) => {
        await axios.patch(`/api/tags/edit`, data);

        setEditId(-1);
        fetchData();
    };

    const handleDelete = async () => {
        try{
            await axios.delete(`/api/tags/delete?id=${deleteTag?.id}`);

            setTags(tags.filter(tag => tag !== deleteTag));
        } catch(error){
            console.error("Error deleting tag: ", error);
        }
    };

    return (
        <React.Fragment>
            <ConfirmationModal show={ show } handleClose={ handleClose } onDelete={ handleDelete } message={ "Are you sure you want to delete this tag?" } />
            <h2>Tags</h2>
            <hr className="my-4" />
            <Container fluid>
                <Row className="pb-3">
                    <Col>
                        <FormControl type="text" aria-label="Search" id="searchInput" placeholder="Search..." onChange={ onSearch }></FormControl>
                    </Col>
                    <Col>
                        <Button variant="success" onClick={ () => setShowCreate(true) }>Create</Button>
                    </Col>
                </Row>
                {showCreate && (
                    <TagForm />
                )}
                <Row className="border border-dark p-3 rounded-top bg-success">
                    Total Tags: { tags.length || 0 }
                </Row>
                {tags.length > 0 && tags.map((tag, index) => (
                    <React.Fragment>
                        { editId === tag.id ? (
                            <TagForm tag={ tag } />
                        ) : (
                            <TagRead index={ index } tag={ tag } setDeleteTag={ setDeleteTag } handleOpen={ handleOpen } setEditId={ setEditId } />
                        )}
                    </React.Fragment>
                ))}
            </Container>
        </React.Fragment>
    );
};

export default TagSettings;