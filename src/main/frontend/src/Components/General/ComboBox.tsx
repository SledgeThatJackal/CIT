import React, { useRef, useState } from 'react';
import { useController, FieldValues, Control, UseFormSetValue, UseFormSetFocus, UseFormSetError, UseFormClearErrors, FieldErrors } from 'react-hook-form';
import { Dropdown, Overlay, Tooltip } from 'react-bootstrap';

import { ContainerDTO } from '../../Types/Container';
import { LinkDTO } from '../../Types/Item';

type InputControllerProps ={
    fieldName: string;
    control: Control<FieldValues, any>
    initialValue?: string;
    hasLinkId: boolean;
    checkIfContainerExists: (scannerId: string) => boolean;
    setError: UseFormSetError<any>;
    clearErrors: UseFormClearErrors<any>;
    showError: () => void;
};

const Input = ({fieldName, control, initialValue, hasLinkId, checkIfContainerExists, setError, clearErrors, showError }: InputControllerProps) => {
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
                disabled={ hasLinkId }
            />
        </>
    )
};

type ComboBoxProps = {
    containerDTOs?: ContainerDTO[];
    index: number;
    link: {
        quantity?: number | undefined;
        scannerId?: string | undefined;
        linkId?: number | null | undefined;
    } & Record<"id", string>;
    control: Control<any>;
    errors: any;
    setValue: UseFormSetValue<any>;
    setFocus: UseFormSetFocus<any>;
    setError: UseFormSetError<any>;
    clearErrors: UseFormClearErrors<any>
    watchLinks: LinkDTO[];
};

const ComboBox = ({ containerDTOs, index, link, control, errors, setValue, setError, clearErrors, watchLinks }: ComboBoxProps) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const handleToggle = (isShown: boolean) => setShowDropdown(isShown); 

    const [showError, setShowError] = useState(false);
    const target = useRef(null);

    const handleDropdownClick = (value: string) => {
        setValue(`links.${index}.scannerId`, value);
    };

    const checkIfContainerExists = (scannerId: string): boolean => {
        return scannerId.length >= 0 && Boolean(containerDTOs?.some(container => container.scannerId === scannerId));
    };

    return (
        <div className="input-group" ref={ target }>
            <Input fieldName={ `links.${index}.scannerId` } control={ control } initialValue={ link.scannerId } hasLinkId={ link.linkId !== undefined } checkIfContainerExists={ checkIfContainerExists } setError={ setError } clearErrors={ clearErrors } showError={ () => setShowError(!showError) } />
            <Dropdown show={ showDropdown } onToggle={ handleToggle }>
                <Dropdown.Toggle>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{maxHeight: "200px", overflowY: "auto"}} >
                    {containerDTOs && containerDTOs.map((containerDTO, index) => (
                        <Dropdown.Item key={`DropDownMenu-${index}`} onClick={ () => handleDropdownClick(containerDTO.scannerId) }> {containerDTO.scannerId + ` (` + containerDTO.name + `)`} </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            {errors.links?.[index]?.scannerId && (
                <Overlay target={ target.current } show={ showError } placement="right">
                    {(props) => (
                        <Tooltip id="overlay-error" {...props}>
                            {`${errors.links[index].scannerId.message}`}
                        </Tooltip>
                    )}
                </Overlay>
            )}
        </div>
    );
};

export default ComboBox;