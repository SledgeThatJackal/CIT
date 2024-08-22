import React, { useEffect } from 'react';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';

import { ItemCreationDTO, LinkDTO, ItemFormSchemaType } from '../../Types/Item';
import TagInput from '../Tag/TagInput';

type EditRowProps = {
    itemCreationDTO?: ItemCreationDTO;
    onSubmit: (data: ItemFormSchemaType) => Promise<void>;
    handleDelete: (index: number, id?: number) => Promise<boolean>;
    cancelEdit: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const EditRow = ({ itemCreationDTO, onSubmit, handleDelete, cancelEdit }: EditRowProps) => {
    const {
        register,
        formState: {errors, isSubmitting},
        control,
        reset,
    } = useFormContext<ItemFormSchemaType>();

    const { fields, append, remove} = useFieldArray({
        control, 
        name: 'links',
    });

    const watchLinks = useWatch({
        control, 
        name: 'links',
    }) as LinkDTO[];

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

    useEffect(() => {
        reset(itemCreationDTO);
    }, [itemCreationDTO, reset]);

    const onDelete = async (index: number, id?: number) => {
        if(id === undefined){
            remove(index);
            return;
        }

        if(await handleDelete(index, id)){
            remove(index);
        }
    };

    return (
        <>
            <tr key={`item-edit-${itemCreationDTO?.item.id}`} className='table-primary'>
                <td>
                    <input {...register("item.name")} type="text" id="nameInput" className="form-control" placeholder="Item Name" autoFocus />
                    {errors.item?.name && (
                        <p>{`${errors.item.name.message}`}</p>
                    )}
                </td>

                <td>
                    <textarea {...register("item.description")} id="descriptionTextArea" className="form-control" placeholder="Item Description" />
                    {errors.item?.description && (
                        <p>{`${errors.item.description.message}`}</p>
                    )}
                </td>

                <td>
                    <TagInput control={ control } name='item.tags' />
                </td>
                
                <td>
                    <div className='btn-group'>
                        <button type="submit" className="btn btn-primary btn-sm" disabled={ isSubmitting }> Save </button>
                        <button type='button' className="btn btn-danger btn-sm" onClick={ () => cancelEdit(-1) }>Discard</button>
                    </div>
                </td>
            </tr>

            <tr className='table-primary'>
                <td colSpan={5}>
                    <table id="linkTable" className="table table-info table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Container ID</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody id="linkTableBody" className="link">
                            {fields.map((link, index) => (
                                <tr key={link.id} data-key={link.id}>
                                    <td>
                                        <input {...register(`links.${index}.scannerId`)} id={`linkId-${index}`} className="form-control" defaultValue={link.scannerId} disabled={ link.scannerId !== '' }/>
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
                </td>
            </tr>
        </>
    )
};

export default EditRow;