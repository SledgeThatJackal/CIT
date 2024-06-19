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
            <div>
                <label htmlFor='nameInput' className='form-label'></label>
                <input {...register("name")} type="text" id="nameInput" className="form-control" placeholder="Container Name" />
                {errors.name && (
                    <p>{`${errors.name.message}`}</p>
                )}
            </div>

            <div>
                <label htmlFor='descriptionTextArea' className='form-label'>Description</label>
                <textarea {...register("description")} id='descriptionTextArea' className="form-control" placeholder="Container Description" />
                {errors.description && (
                    <p>{`${errors.description.message}`}</p>
                )}
            </div>

            <div>
                <label htmlFor='parentConatainerInput' className='form-label'>Parent Container ID</label>
                <input {...register("parent_container", {valueAsNumber: true})} id='parentConatainerInput' type="number" className="form-control" placeholder="Parent Container ID" />
                {errors.parent_container && (
                    <p>{`${errors.parent_container.message}`}</p>
                )}
            </div>

            <div>
                <label htmlFor='scannerIdInput' className='form-label'>Scanner ID</label>
                <input {...register("scanner_id")} type="text" id='scannerIdInput' className="form-control" placeholder="Scanner ID" />
                {errors.scanner_id && (
                    <p>{`${errors.scanner_id.message}`}</p>
                )}
            </div>

            <button type="submit" disabled={isSubmitting}>Submit</button>
        </form>
    );
};