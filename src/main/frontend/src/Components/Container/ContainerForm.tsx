import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContainerFormSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    description: z.string().optional(),
    parentContainer: z.number().optional(),
    scannerId: z.string(),
});

type ContainerFormSchemaType = z.infer<typeof ContainerFormSchema>;

export default function ContainerForm(){
    const location = useLocation();
    const navigate = useNavigate();

    const container = location.state?.response;

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<ContainerFormSchemaType>({
        defaultValues: container 
        ? {
            id: container.id,
            name: container.name,
            description: container.description,
            parentContainer: container.parentContainer,
            scannerId: container.scannerId,
        } : undefined,
        resolver: zodResolver(ContainerFormSchema),
    });

    const onSubmit = async (data: ContainerFormSchemaType) => {
        if(container){
            // Edit
            await axios.patch(`/api/container/edit`, data);
            navigate(-1); // Go to the previous page
        } else {
            // Create
            await axios.post(`/api/container/create`, data);
            reset();
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <form className='w-75 p-3' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='nameInput' className='form-label'>Name</label>
                    <input {...register("name")} type="text" id="nameInput" className="form-control" placeholder="Container Name" autoFocus/>
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
                    <input {...register("parentContainer", {valueAsNumber: true})} id='parentConatainerInput' type="number" className="form-control" placeholder="Parent Container ID" />
                    {errors.parentContainer && (
                        <p>{`${errors.parentContainer.message}`}</p>
                    )}
                </div>

                <div>
                    <label htmlFor='scannerIdInput' className='form-label'>Scanner ID</label>
                    <input {...register("scannerId")} type="text" id='scannerIdInput' className="form-control" placeholder="Scanner ID" />
                    {errors.scannerId && (
                        <p>{`${errors.scannerId.message}`}</p>
                    )}
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
            </form>
        </div>
    );
};