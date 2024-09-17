import React, { useEffect } from 'react';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import axios from 'axios';

import { ItemDTO, LinkDTO, ItemFormSchemaType } from '../../Types/Item';

import TagInput from '../Tag/TagInput';
import ComboBox from './ComboBox';

type EditRowProps = {
    itemDTO?: ItemDTO;
    handleDelete: (index: number, id?: number) => Promise<boolean>;
    cancelEdit: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const EditRow = ({ itemDTO, handleDelete, cancelEdit }: EditRowProps) => {
    const {
        register,
        formState: {errors, isSubmitting},
        control,
        setFocus,
        reset,
        trigger,
        setError
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
                trigger("links");
                setFocus(`links.${watchLinks.length - 1}.scannerId`); 
            }, 0);
        };
    
        if(watchLinks?.length > 1 && !watchLinks?.[watchLinks.length - 2]?.scannerId && !watchLinks?.[watchLinks.length - 1]?.scannerId){
            remove(watchLinks.length - 1);
        };
    }, [watchLinks]);

    useEffect(() => {
        reset(itemDTO);

        append({scannerId: '', quantity: 1});
        trigger("links");
    }, [itemDTO, reset]);

    const onDelete = async (index: number, id?: number) => {
        if(id === undefined){
            if(watchLinks.length > 1){
                remove(index);
            }

            return;
        }

        if(await handleDelete(index, id)){
            remove(index);
        }
    };

    return (
        <>
            <tr key={`item-edit-${itemDTO?.item.id}`} className='table-primary'>
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
                        <button type="submit" className="btn btn-info btn-sm" disabled={ isSubmitting || Object.keys(errors).length > 0 }> Save </button>
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
                                <tr key={`link-${link.id}`} data-key={`link-${link.id}`}>
                                    <td>
                                        <input {...register(`links.${index}.scannerId`)} id={`linkId-${index}`} className="form-control" defaultValue={ link.scannerId } disabled={ link.linkId !== undefined } onBlur={ async (event) => {
                                            const scannerId = event.target.value;

                                            if(scannerId){
                                                const response = await axios.get(`/api/container/check?scannerId=${scannerId}`);

                                                if(response.status === 202){
                                                    setError(`links.${index}.scannerId`, {message: "Container ID does not exist"});
                                                }
                                            }
                                        }} />
                                        {errors.links?.[index]?.scannerId && (
                                            <li className='list-group-item text-danger'>
                                                {`${errors.links[index].scannerId.message}`}
                                            </li>
                                        )}
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
            <ComboBox />
        </>
    )
};

export default EditRow;