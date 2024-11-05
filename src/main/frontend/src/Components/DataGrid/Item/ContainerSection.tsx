import React, { useEffect } from 'react';
import { CloseButton, Form, Table } from 'react-bootstrap';
import { Control, FieldErrors, useFieldArray, UseFormClearErrors, UseFormRegister, UseFormSetError, UseFormSetFocus, UseFormSetValue, UseFormTrigger, useWatch } from 'react-hook-form';
import { ItemSchemaType } from '../../../Types/Item';
import ComboBox from '../../General/ComboBox';
import { ContainerItem } from '../../../Types/ContainerItem';

type ContainerSectionProps = {
    control: Control<ItemSchemaType>;
    register: UseFormRegister<ItemSchemaType>;
    errors: FieldErrors<ItemSchemaType>;
    trigger: UseFormTrigger<ItemSchemaType>;
    setFocus: UseFormSetFocus<ItemSchemaType>;
    setError: UseFormSetError<ItemSchemaType>;
    clearErrors: UseFormClearErrors<ItemSchemaType>;
};

const ContainerSection = ({ control, register, errors, trigger, setFocus, setError, clearErrors }: ContainerSectionProps) => {
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'containerItems'
    });

    const watchContainerItems = useWatch({
        control,
        name: 'containerItems'
    }) as ContainerItem[];

    useEffect(() => {
        if(watchContainerItems?.length === 0 || watchContainerItems?.[watchContainerItems.length - 1]?.container?.scannerId){
            append({ id: undefined, container: {id: -1, name: "", scannerId:"", description: undefined, parentContainer: undefined}, quantity: Number(1) });

            setTimeout(() => {
                trigger("containerItems");
                setFocus(`containerItems.${watchContainerItems.length - 1}.container.scannerId`);
            }, 0);
        }

        if(watchContainerItems?.length > 1 && !watchContainerItems?.[watchContainerItems.length -2 ]?.container?.scannerId && !watchContainerItems?.[watchContainerItems.length -1]?.container?.scannerId){
            remove(watchContainerItems.length - 1);
        }
    }, [watchContainerItems]);

    return (
        <Table>
            <thead>
                <tr>
                    <th scope="col">
                        Name
                    </th>
                    <th scope="col">
                        Container Id
                    </th>
                    <th scope="col">
                        Quantity
                    </th>
                    <th scope="col">
                        Remove
                    </th>
                </tr>
            </thead>
            <tbody>
                {fields && fields.map((field, index) => (
                    <tr key={`CIFields-${field.id}`}>
                        <th>
                            {field.container?.name}
                        </th>
                        <td>
                            <ComboBox index={ index } field={ field } control={ control } errors={ errors } update={ update } setFocus={ setFocus } setError={ setError } clearErrors={ clearErrors }  />
                        </td>
                        <td>
                            <Form.Control {...register(`containerItems.${index}.quantity`, {valueAsNumber: true})} type="number" />
                        </td>
                        <td>
                            <CloseButton onClick={ () => remove(index) } />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ContainerSection;