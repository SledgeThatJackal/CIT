import React from 'react';
import { Row, Col, InputGroup, Button } from 'react-bootstrap';

import TagBadge from '../tag/TagBadge';
import { Tag } from '../../cit_types/Tag';

type TagReadProps = {
    index: number;
    tag: Tag;
    setDeleteTagId: React.Dispatch<React.SetStateAction<number>>;
    handleOpen: () => void;
    setEditId: React.Dispatch<React.SetStateAction<number>>;
};

const TagRead = ({ index, tag, setDeleteTagId, handleOpen, setEditId }: TagReadProps) => {
    const setupDelete = () => {
        setDeleteTagId(tag.id);
        handleOpen();
    };

    return (
        <Row key={`tagRow-${index}`} className="text-light pt-3 pb-3" style={{ background: "#4B555F", borderTop: "3px solid #7B8895", borderBottom: "3px solid #7B8895" }}>
            <Col className="d-flex align-items-center me-auto">
                <TagBadge tag={ tag } />
                : { tag.description }
            </Col>
            <Col>
                <InputGroup className="d-flex justify-content-end">
                    <Button type="button" variant="info" onClick={ () => setEditId(tag.id)}>Edit</Button>
                    <Button type="button" variant="danger" onClick={ setupDelete }>Delete</Button>
                </InputGroup>
            </Col>
        </Row>
    );
};

export default TagRead;