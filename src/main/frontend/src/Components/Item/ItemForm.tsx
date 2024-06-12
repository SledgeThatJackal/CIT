import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { Item, ItemCreationDTO, LinkDTO } from '../../Types/Item';

const LinkSchema = z.object({
    scannerId: z.string(),
    quantity: z.number().positive(),
    id: z.number()
});

const ItemFormSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    links: z.array(LinkSchema).optional()
});

type ItemFormSchemaType = z.infer<typeof ItemFormSchema>;

export default function ItemForm(){
const location = useLocation();
const { item, links } = location.state?.response;

const itemCreationDTO: ItemCreationDTO | undefined = item && links ? {
    item: item as Item,
    links: links as LinkDTO[]
} : undefined;

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<ItemFormSchemaType>({
        defaultValues: itemCreationDTO?.item && itemCreationDTO?.links
        ? {
            name: itemCreationDTO.item.name,
            description: itemCreationDTO.item.description,
            links: itemCreationDTO.links,
        } : undefined,
        resolver: zodResolver(ItemFormSchema),
    });

    const onSubmit = async (data: ItemFormSchemaType) => {
        if(itemCreationDTO){
            // Implement functionality
        } else {
            // Implement functionality
        }
    ;}

    const onDelete = async (linkId: number) => {
        try{
            await axios.delete(`/api/link?id=${linkId}`);

            const linkRow = document.querySelector(`[data-key='${linkId}']`);

            if(linkRow){
                linkRow.remove();
            }
        } catch (error) {
            console.error('Error deleting link: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} type="text" className="form-control" placeholder="Item Name" />
            {errors.name && (
                <p>{`${errors.name.message}`}</p>
            )}

            <input {...register("description")} type="text" className="form-control" placeholder="Item Description" />
            {errors.description && (
                <p>{`${errors.description.message}`}</p>
            )}

            <table id="linkTable" className="table table-secondary table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Scanner ID</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody id="linkTableBody" className="link">
                    {itemCreationDTO?.links.map((link, index) => (
                        <tr key={link.id} data-key={link.id}>
                            <th>{index + 1}</th>
                            <td>
                                <input {...register(`links.${index}.scannerId`)} className="form-control" defaultValue={link.scannerId} />
                            </td>
                            <td>
                                <input {...register(`links.${index}.quantity`)} className="form-control" defaultValue={link.quantity} />
                            </td>
                            <td>
                                <button className="btn-close" aria-label="Close" onClick={() => onDelete(link.id)}></button>
                            </td>
                            {errors.links && errors.links[index] && (
                                <p>{errors.links[index]?.message}</p>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{itemCreationDTO ? 'Update' : 'Create'}</button>
        </form>
    );
};