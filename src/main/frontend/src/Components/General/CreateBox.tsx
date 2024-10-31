import React from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { ItemFormSchema, ItemFormSchemaType } from '../../Types/Item';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateItem } from '../../Services/mutations';
import TagInput from '../Tag/TagInput';

const CreateBox = () => {
    const createItemMutation = useCreateItem();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
        control,
        reset,
        setFocus
    } = useForm<ItemFormSchemaType>({
        defaultValues: {},
        // resolver: zodResolver(ItemFormSchema)
    });

    const onSubmit = async (data: ItemFormSchemaType) => {
        console.log(data);
    };

    return(
        <Form onSubmit={ handleSubmit(onSubmit) }>
            <Container className={`text-light pt-3 pb-3 mb-3 rounded`} style={{ background: "#4B555F", border: "3px solid #7B8895" }}>
                <Row>
                    <Form.Group as={ Col } controlId="itemName">
                        <FloatingLabel controlId="floatingName" label="Name">
                            <Form.Control {...register("item.name")} type="text" autoFocus={ true } />
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                            {errors.item?.name?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={ Col } controlId="itemDesc">
                        <FloatingLabel controlId="floatingDesc" label="Description">
                            <Form.Control {...register("item.description")} type="text"/>
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                            {errors.item?.description?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Col md="2" as={ Stack } direction="horizontal" gap={ 2 }>
                        <div className="vr" />
                        <Button type="submit" variant="success" disabled={ isSubmitting }>Create</Button>
                        <Button type="button" variant="outline-danger" >Cancel</Button>
                    </Col>
                </Row>
                <Row className="pt-3">
                    <Col>
                        <TagInput control={ control } name="item.tags" />
                    </Col>
                </Row>
                <Row className="pt-3">
                    <Col>
                        Container Table
                    </Col>
                    <Col>
                        Type will go here
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};

export default CreateBox;