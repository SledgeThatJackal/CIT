import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from '../../Types/Container';

const ContainerFormSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    parent_container: z.number().optional(),
    scanner_id: z.string(),
});

type ContainerFormSchemaType = z.infer<typeof ContainerFormSchema>;

type ContainerFormProps = {
    container?: Container;
};

export default function ContainerForm({ container }: ContainerFormProps){
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<ContainerFormSchemaType>({
        defaultValues: container 
        ? {
            name: container.name,
            description: container.description,
            parent_container: container.parentContainer,
            scanner_id: container.scannerId,
        } : undefined,
        resolver: zodResolver(ContainerFormSchema),
    });

    const onSubmit = async (data: ContainerFormSchemaType) => {
        if(container){
            // Edit the container
        } else {
            console.log(data);
            await new Promise(resolve => setTimeout(resolve, 1000));
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} type="text" className="form-control" placeholder="Container Name" />
            {errors.name && (
                <p>{`${errors.name.message}`}</p>
            )}

            <input {...register("description")} type="text" className="form-control" placeholder="Container Description" />
            {errors.description && (
                <p>{`${errors.description.message}`}</p>
            )}

            <input {...register("parent_container", {valueAsNumber: true})} type="number" className="form-control" placeholder="Parent Container ID" />
            {errors.parent_container && (
                <p>{`${errors.parent_container.message}`}</p>
            )}

            <input {...register("scanner_id")} type="text" className="form-control" placeholder="Scanner ID" />
            {errors.scanner_id && (
                <p>{`${errors.scanner_id.message}`}</p>
            )}

            <button type="submit" disabled={isSubmitting}>Submit</button>
        </form>
    );
};