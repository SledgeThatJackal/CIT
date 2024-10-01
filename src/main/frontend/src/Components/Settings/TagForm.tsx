import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';

import { Row, Col, Form, Button } from 'react-bootstrap';

import TagBadge from '../Tag/TagBadge';

import { Tag } from '../../Types/Tag';

type TagFormProps = {
    tag?: Tag;
};

const TagSchema = z.object({
    id: z.number(),
    tag: z.string(),
    color: z.string(),
    description: z.string(),
});

type TagSchemaType = z.infer<typeof TagSchema>;

const TagForm = ({ tag }: TagFormProps) => {
    const [exampleTag, setExampleTag] = useState<Tag>(tag || {id: -1, tag: "Example Name", color: "#00AAFF", description:"Example Description"});

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
        reset
    } = useForm<TagSchemaType>({
        defaultValues: tag,
        resolver: zodResolver(TagSchema)
    });

    const watchedTag = useWatch({ control });

    useEffect(() => {
        setExampleTag(prev => ({
            id: watchedTag.id ?? prev.id,
            tag: watchedTag.tag ?? prev.tag,
            color: watchedTag.color ?? prev.color,
            description: watchedTag.description ?? prev.description
        }));
    }, [watchedTag]);

    const onSubmit = async (data: TagSchemaType) => {
        // if(tag){
        //     await axios.patch(`/api/tags/edit`, data);
        // } else {
        //     await axios.post(`/api/tags/create`, data);
        // }
        
        console.log(data);
    };

    return (
        <Row className="border border-dark bg-primary pt-3 pb-3">
            <Form onSubmit={ handleSubmit(onSubmit) }>
                <Col md="2">
                    <TagBadge tag={ exampleTag } />
                </Col>
                <Form.Group as={ Col } md="4" controlId="tagName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control {...register("tag")} type="text" placeholder="Enter name here..." autoFocus={ true } />
                    <Form.Control.Feedback type="invalid">
                        {errors.tag?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={ Col } md="4" controlId="tagDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control {...register("description")} type="text" placeholder="Enter description here..." />
                    <Form.Control.Feedback>
                        {errors.description?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={ Col } md="1" controlId="tagColor">
                    <Form.Label>Color</Form.Label>
                    <Form.Control {...register("color")} type="color" />
                </Form.Group>
                <Col md="1">
                    <Button type="submit" variant="success">{ tag ? "Edit" : "Create" }</Button>
                </Col>
            </Form>
        </Row>
    );
};

export default TagForm;