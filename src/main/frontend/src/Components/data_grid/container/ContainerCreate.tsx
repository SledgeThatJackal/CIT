import React from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';
import { useCreateContainer } from '../../../services/mutations';
import { useCanvasState } from '../../../state/useCanvasState';
import { useForm } from 'react-hook-form';
import { ContainerType } from '../../../cit_types/Container';

const ContainerCreate = () => {
    const createContainerMutation = useCreateContainer();
    const { closeCanvas } = useCanvasState();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
        reset,
    } = useForm<ContainerType>({
        defaultValues: {id: undefined, name: undefined, description: undefined, scannerId: undefined, parentContainer: undefined, containerItems: []},

    });

    const onSubmit = async (data: ContainerType) => {
        createContainerMutation.mutate(data);
        reset();
    };

    return(
        <Form onSubmit={ handleSubmit(onSubmit) }>
            <Container className={`text-light pt-3 pb-3 mb-3 rounded`} style={{ background: "#4B555F", border: "3px solid #7B8895" }}>
                <Row>
                    <Form.Group as={ Col } controlId="containerName">
                        <FloatingLabel controlId="floatingName" label="Name">
                            <Form.Control {...register("name")} type="text" autoFocus required/>
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={ Col } controlId="floatingDesc">
                        <FloatingLabel controlId="floatingDesc" label="Description">
                            <Form.Control {...register("description")} type="text" />
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                            {errors.description?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={ Col } controlId="floatingScannerId">
                        <FloatingLabel controlId="floatingScannerId" label="Container ID">
                            <Form.Control {...register("scannerId")} type="text" />
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                            {errors.scannerId?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={ Col } controlId="floatingParent">
                        <FloatingLabel controlId="floatingParent" label="Parent Container">
                            
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                            {errors.parentContainer?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Col md="2" as={ Stack } direction="horizontal" gap={ 2 }>
                        <div className="vr" />
                        <Button type="submit" variant="success" disabled={ isSubmitting }>Create</Button>
                        <Button type="button" variant="outline-danger" onClick={ closeCanvas }>Cancel</Button>
                    </Col>
                </Row>
            </Container>             
        </Form>
    );
};

export default ContainerCreate;