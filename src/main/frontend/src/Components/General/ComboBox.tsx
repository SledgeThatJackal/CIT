import React, { useRef, useState } from 'react';
import { useController, FieldValues, Control, UseFormSetValue, UseFormSetFocus, UseFormSetError, UseFormClearErrors, FieldErrors, FieldArrayWithId, UseFormTrigger } from 'react-hook-form';
import { Dropdown, Overlay, Tooltip } from 'react-bootstrap';

import { Container, ContainerDTO } from '../../Types/Container';
import { ItemSchemaType, LinkDTO } from '../../Types/Item';
import { useContainers } from '../../Services/queries';
import { ContainerItem } from '../../Types/ContainerItem';

type InputControllerProps ={
    fieldName: string;
    control: Control<FieldValues, ItemSchemaType>;
    initialValue?: string;
    checkIfContainerExists: (scannerId: string) => boolean;
    setError: UseFormSetError<any>;
    clearErrors: UseFormClearErrors<any>;
    showError: () => void;
};

const Input = ({ fieldName, control, initialValue, checkIfContainerExists, setError, clearErrors, showError }: InputControllerProps) => {
    const {
        field,
        fieldState: { error }
    } = useController({
        name: fieldName,
        control,
        defaultValue: initialValue || ''
    });

    return (
        <>
            <input 
                {...field}
                className="form-control"
                onChange={(e) => {
                    field.onChange && field.onChange(e);
                }}
                onBlur={() => {
                    field.onBlur();
                    if(checkIfContainerExists(field.value)){
                        clearErrors(field.name);
                    } else {
                        setError(field.name, {message: 'Container ID does not exist'});
                        showError();
                    }
                }}
                value={ field.value }
            />
        </>
    )
};

type ComboBoxProps = {
    index: number;
    field: FieldArrayWithId<ItemSchemaType, "containerItems", "id">;
    control: Control<any>;
    errors: FieldErrors<ItemSchemaType>;
    trigger: UseFormTrigger<ItemSchemaType>;
    setValue: UseFormSetValue<ItemSchemaType>;
    setFocus: UseFormSetFocus<ItemSchemaType>;
    setError: UseFormSetError<ItemSchemaType>;
    clearErrors: UseFormClearErrors<ItemSchemaType>;
};

const ComboBox = ({ index, field, control, errors, trigger, setValue, setError, clearErrors }: ComboBoxProps) => {
    const containerQuery = useContainers().data;

    const [showDropdown, setShowDropdown] = useState(false);
    const handleToggle = (isShown: boolean) => setShowDropdown(isShown); 

    const [showError, setShowError] = useState(false);
    const target = useRef(null);

    const handleDropdownClick = (value: Container) => {
        setValue(`containerItems.${index}.container`, value);
        trigger(`containerItems.${index}.container`);
    };

    const checkIfContainerExists = (scannerId: string): boolean => {
        if(scannerId.length >= 0 && containerQuery?.some(container => container.scannerId === scannerId)){
            const container: Container = containerQuery?.find(container => container.scannerId === scannerId)!;
            handleDropdownClick(container);

            return true;
        }

        return false;
    };

    return (
        <div className="input-group" ref={ target }>
            <Input fieldName={ `containerItems.${index}.container.scannerId` } control={ control } checkIfContainerExists={ checkIfContainerExists } setError={ setError } clearErrors={ clearErrors } showError={ () => setShowError(!showError) } />
            <Dropdown show={ showDropdown } onToggle={ handleToggle }>
                <Dropdown.Toggle>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{maxHeight: "200px", overflowY: "auto"}} >
                    {containerQuery && containerQuery.map((container, index) => (
                        <Dropdown.Item key={`DropDownMenu-${index}`} onClick={ () => handleDropdownClick(container) }> {container.scannerId + ` (` + container.name + `)`} </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            {errors.containerItems?.[index]?.container?.scannerId && (
                <Overlay target={ target.current } show={ showError } placement="right">
                    {(props) => (
                        <Tooltip id="overlay-error" {...props}>
                            {`${errors?.containerItems?.[index]?.container?.scannerId?.message}`}
                        </Tooltip>
                    )}
                </Overlay>
            )}
        </div>
    );
};

export default ComboBox;