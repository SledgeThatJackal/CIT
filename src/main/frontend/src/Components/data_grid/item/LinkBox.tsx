import React, { useEffect } from 'react';
import { Button, Container, Form, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ContainerSection from './ContainerSection';
import { Item, ItemSchema, ItemSchemaType } from '../../../cit_types/Item';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateItem } from '../../../services/mutations';
import { useActionState } from '../../../state/useActionState';
import { useCanvasState } from '../../../state/useCanvasState';

const LinkBox = () => {
    const updateItemMutation = useUpdateItem();

    const { item, clearAction } = useActionState();
    const { closeCanvas } = useCanvasState();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
        control,
        reset,
        setFocus,
        setError,
        clearErrors,
        getValues,
    } = useForm<ItemSchemaType>({
        defaultValues: item,
        resolver: zodResolver(ItemSchema)
    });

    useEffect(() => {
        reset(item);
    }, [item]);

    const onSubmit = async (data: ItemSchemaType) => {
        const item: ItemSchemaType = {...data, containerItems: data.containerItems?.slice(0, -1)};

        updateItemMutation.mutate(item);
        closeBox();
    };

    const closeBox = () => {
        closeCanvas()
        clearAction();
    };

    return(
        <Container className={`text-light pt-3 pb-3 mb-3 rounded`} style={{ background: "#4B555F", border: "3px solid #7B8895" }}>
            <Form onSubmit={ handleSubmit(onSubmit) }>
                <ContainerSection control={ control } register={ register } errors={ errors } setFocus={ setFocus } setError={ setError } clearErrors={ clearErrors } getValues={ getValues } />
                <Stack direction="horizontal">
                    <Button type="submit" variant="success" disabled={ isSubmitting }>Submit</Button>
                    <Button variant="danger" className="ms-auto" onClick={ closeBox }>Cancel</Button>
                </Stack>
            </Form>
        </Container>
    );
};

export default LinkBox;