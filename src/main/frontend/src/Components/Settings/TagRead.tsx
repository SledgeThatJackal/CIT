import React from 'react';
import { Row, Col, InputGroup, Button } from 'react-bootstrap';

import TagBadge from '../Tag/TagBadge';
import { Tag } from '../../Types/Tag';

type TagReadProps = {
    index: number;
    tag: Tag;
    setDeleteTag: React.Dispatch<React.SetStateAction<Tag | undefined>>;
    handleOpen: () => void;
    setEditId: React.Dispatch<React.SetStateAction<number>>;
};

const TagRead = ({ index, tag, setDeleteTag, handleOpen, setEditId }: TagReadProps) => {
    const setupDelete = () => {
        setDeleteTag(tag);
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