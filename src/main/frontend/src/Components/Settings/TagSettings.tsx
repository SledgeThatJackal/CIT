import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, FormControl, Form, Stack } from 'react-bootstrap';

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
    const [bulkCreating, setBulkCreating] = useState<boolean>(false);
    const closeCreate = () => setShowCreate(false);

    // Edit Area
    const [editId, setEditId] = useState<number>(-1);
    const closeEdit = () => setEditId(-1);

    // Search
    const [search, setSearch] = useState<string>("");
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

    const fetchData = async () => {
        try{
            const response = (await axios.get<Tag[]>(`/api/tags`)).data;

            setTags(response);
            sessionStorage.setItem("tags", JSON.stringify(response));
        } catch (error) {
            console.error('Request failed: ', error);
        }
    };

    const getTags = () => {
        try{
            const tags = sessionStorage.getItem("tags");

            if(tags){
                setTags(JSON.parse(tags));
            } else {
                fetchData();
            }
        } catch (error) {
            console.log('Request failed: ', error);
        }
    };

    useEffect(() => {
        getTags();
    }, []);

    useEffect(() => {
        if(tags){
            setFilteredTags(tags.filter(tag => tag.tag.toLowerCase().includes(search.toLowerCase())));
        }
    }, [tags, search]);

    const onCreate = () => {
        if(!bulkCreating){
            closeCreate();
        }

        fetchData();
    };

    const onEdit = () => {
        closeEdit();
        fetchData();
    };

    const handleDelete = async () => {
        try{
            await axios.delete(`/api/tags/delete?id=${deleteTag?.id}`);

            const updatedTags = tags.filter(tag => tag !== deleteTag);

            setTags(updatedTags);
            sessionStorage.setItem("tags", JSON.stringify(updatedTags));
        } catch(error){
            console.error("Error deleting tag: ", error);
        }
    };

    return (
        <React.Fragment>
            <ConfirmationModal show={ show } handleClose={ handleClose } onDelete={ handleDelete } message={ "Are you sure you want to delete this tag?" } />
            <Container fluid>
                <Row>
                    <h2>Tags</h2>
                </Row>
                <Row>
                    <hr />
                </Row>
                <Row className="mx-auto justify-content-center w-75 mb-3">
                    <Col>
                        <FormControl type="text" className="w-75" aria-label="Search" id="searchInput" placeholder="Search..." value={ search } onChange={ (event) => setSearch(event.target.value) }></FormControl>
                    </Col>
                    <Col as={ Stack } direction="horizontal" gap={ 2 } className="d-flex justify-content-end">
                        <Button variant="success" onClick={ () => setShowCreate(true) } disabled={ showCreate }>Create</Button>
                        <Form.Switch className="my-auto" id="bulkSwitch" label="Bulk Create" onChange={ () => setBulkCreating(!bulkCreating)} disabled={ !showCreate } />
                    </Col>
                </Row>
                {showCreate && (
                    <TagForm closeCreate={ closeCreate } onCreate={ onCreate } />
                )}
            </Container>
            <Container fluid className="rounded bg-dark text-white mt-3 w-75 overflow-auto" style={{ height: "65vh", border: "3px solid #7B8895" }}>
                <Row className="p-3">
                    Tags: { filteredTags.length || 0 } out of { tags.length || 0 }
                </Row>
                {filteredTags.length > 0 ? filteredTags.map((tag, index) => (
                    <React.Fragment>
                        { editId === tag.id ? (
                            <TagForm tag={ tag } onEdit={ onEdit } closeEdit={ closeEdit } />
                        ) : (
                            <TagRead index={ index } tag={ tag } setDeleteTag={ setDeleteTag } handleOpen={ handleOpen } setEditId={ setEditId } />
                        )}
                    </React.Fragment>
                )) : (
                    <Row className="text-center" style={{ background: "#4B555F", borderTop: "3px solid #7B8895", borderBottom: "3px solid #7B8895" }}>
                        <h4>No tags found.</h4>
                    </Row>
                )}
            </Container>
        </React.Fragment>
    );
};

export default TagSettings;