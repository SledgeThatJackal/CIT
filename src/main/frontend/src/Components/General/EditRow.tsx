import React, { useEffect, useState } from 'react';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Stack, Toast, Button, CloseButton } from 'react-bootstrap';

import { ItemDTO, LinkDTO, ItemFormSchemaType } from '../../Types/Item';
import { ContainerDTO } from '../../Types/Container';

import TagInput from '../Tag/TagInput';
import ComboBox from './ComboBox';

type EditRowProps = {
    itemDTO?: ItemDTO;
    containerDTOs?: ContainerDTO[];
    setupDelete: (action: () => Promise<void>, message: string) => void;
    handleDelete: (index: number, id?: number) => Promise<boolean>;
    cancelEdit: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const EditRow = ({ itemDTO, containerDTOs, setupDelete, handleDelete, cancelEdit }: EditRowProps) => {
    const {
        register,
        formState: {errors, isSubmitting},
        control,
        setFocus,
        reset,
        trigger,
        setError,
        setValue,
        clearErrors
    } = useFormContext<ItemFormSchemaType>();

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const toggleToast = () => setShowToast(!showToast);

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

    const checkForDuplicate = (scannerId: string, index: number) => {
        const values = watchLinks;

        const element = values.find(link => { return (link?.linkId && (link?.scannerId?.trim() === scannerId.trim())); });

        if(element){
            const elementIndex = values.findIndex(link => link === element);

            const oldSum = element.quantity; // I am saving this to display to the user
            const sum = (oldSum || 1) + watchLinks[index].quantity;

            if(sum < 1){
                setupDelete(() => onDelete(index, element.linkId ? element.linkId : undefined), `If you do this, the item quantity in Container: ${element.scannerId} will be less than one. Do you want to delete this link or cancel the operation?`);
            } else {
                setValue(`links.${elementIndex}.quantity`, sum);
                setToastMessage(`Containter ID: ${element.scannerId}, New Quantity: ${sum}, Old Quantity: ${oldSum}`);
                toggleToast();
            }

            remove(index);
        }
    };

    return (
        <>
            <tr key={`item-edit-${itemDTO?.item.id}`} className='table-primary w-100'>
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
                    {/* <TagInput control={ control } name='item.tags' /> */}
                </td>
                
                <td>
                    <Stack direction="horizontal" gap={ 3 }>
                        <Button type="submit" variant="success" size="sm" disabled={ isSubmitting || Object.keys(errors).length > 0 }>Save</Button>
                        <div className="vr" />
                        <Button type="button" variant="outline-danger" size="sm" onClick={ () => cancelEdit(-1) }>Discard</Button>
                    </Stack>
                </td>
            </tr>

            <tr className='table-primary'>
                <td colSpan={6}>
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
                                        {/* {containerDTOs && (
                                            <ComboBox key={`link-combobox-${link.id}`} containerDTOs={ containerDTOs } control={ control } errors={ errors } setError={ setError } clearErrors={ clearErrors } index={ index } link={ link } setValue={ setValue } setFocus={ setFocus } />
                                        )} */}
                                    </td>
                                    <td>
                                        <input {...register(`links.${index}.quantity`, {valueAsNumber: true})} className="form-control" min={-Infinity}
                                        onBlur={
                                            () => {
                                                if(watchLinks[index].scannerId && link.linkId === undefined){
                                                    checkForDuplicate(watchLinks[index].scannerId, index);
                                                }
                                            }
                                        } />
                                    </td>
                                    <td>
                                        <CloseButton onClick={() => onDelete(index, link.linkId ? link.linkId : undefined)} />
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

            <Toast show={ showToast } onClose={ toggleToast }>
                <Toast.Header>
                    <strong className="me-auto">Combined</strong>
                </Toast.Header>
                <Toast.Body>
                    { toastMessage }
                </Toast.Body>
            </Toast>
        </>
    )
};

export default EditRow;