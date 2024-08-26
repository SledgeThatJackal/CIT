import React, { useEffect } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';

import { ItemDTO, LinkDTO, ItemFormSchema, ItemFormSchemaType } from '../../Types/Item';
import TagInput from '../Tag/TagInput';

type ItemFromProp = {
    itemDTO?: ItemDTO;
    reference?: any;
};

export default function ItemForm({ itemDTO, reference }: ItemFromProp){
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        control,
        reset,
    } = useForm<ItemFormSchemaType>({
        defaultValues: itemDTO
        ? itemDTO : {
            item: {},
            links: [{quantity: 1}],
        },
        resolver: zodResolver(ItemFormSchema),
    });

    const { fields, append, remove} = useFieldArray({
        control, 
        name: 'links',
    });

    const watchLinks = useWatch({
        control, 
        name: 'links',
    }) as LinkDTO[];

    const onSubmit = async (data: ItemFormSchemaType) => {    
        if(itemDTO){
            // Edit 
            await axios.patch(`/api/item/edit`, data);
            reset();
        } else {
            // Create
            await axios.post(`/api/item/create`, data);
            reset();
        }

    };

    const onDelete = async (index: number, id?: number) => {
        if(id === undefined){
            remove(index);
            return;
        }

        try{
            await axios.delete(`/api/link?id=${id}`);

            remove(index);
        } catch (error) {
            console.error('Error deleting link: ', error);
        }
    };

    useEffect(() => {
        if(watchLinks?.[watchLinks.length - 1]?.scannerId){
            append({scannerId: '', quantity: 1});

            setTimeout(() => {
                document.getElementById(`linkId-${watchLinks.length - 1}`)?.focus(); 
            }, 0);
        };
    
        if(watchLinks?.length > 1 && !watchLinks?.[watchLinks.length - 2]?.scannerId && !watchLinks?.[watchLinks.length - 1]?.scannerId){
            remove(watchLinks.length - 1);
        };
    }, [watchLinks]);

    useEffect( () => {
        if(itemDTO){
            reset(itemDTO);
        }
    }, [itemDTO]);

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <form className='w-75 p-3' onSubmit={handleSubmit(onSubmit, (errors => {
                console.error("Validation Errors: ", errors);
            }))}>
                <div className='mb-3'>
                    <label htmlFor='nameInput' className='form-label'>Name</label>
                    <input {...register("item.name")} type="text" id="nameInput" className="form-control" placeholder="Item Name" autoFocus />
                    {errors.item?.name && (
                        <p>{`${errors.item.name.message}`}</p>
                    )}
                </div>
                
                <div className='mb-3'>
                    <label htmlFor='descriptionTextArea' className='form-label'>Description</label>
                    <textarea {...register("item.description")} id="descriptionTextArea" className="form-control" placeholder="Item Description" />
                    {errors.item?.description && (
                        <p>{`${errors.item.description.message}`}</p>
                    )}
                </div>

                <TagInput control={ control } name='item.tags' />

                <table id="linkTable" className="table table-secondary table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Scanner ID</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody id="linkTableBody" className="link">
                        {fields.map((link, index) => (
                            <tr key={link.id} data-key={link.id}>
                                <td>
                                    <input {...register(`links.${index}.scannerId`)} id={`linkId-${index}`} className="form-control" defaultValue={link.scannerId} />
                                </td>
                                <td>
                                    <input {...register(`links.${index}.quantity`, {valueAsNumber: true})} className="form-control" defaultValue={link.quantity} />
                                </td>
                                <td>
                                    <button type='button' className="btn-close" aria-label="Close" onClick={() => onDelete(index, link.linkId ? link.linkId : undefined)}></button>
                                </td>
                                {errors.links && errors.links[index] && (
                                    <p>{errors.links[index]?.message}</p>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button type="submit" className="btn btn-primary" disabled={ isSubmitting } ref={ reference } style={{ display: reference ? 'none' : ''}}> Create </button>
            </form>
        </div>
    );
};