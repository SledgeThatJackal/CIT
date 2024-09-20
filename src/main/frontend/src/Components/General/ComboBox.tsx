import React, { useRef, useState } from 'react';
import { useController, FieldValues, Control, UseFormSetValue, UseFormSetFocus, UseFormSetError, UseFormClearErrors } from 'react-hook-form';
import { Dropdown } from 'bootstrap';

import { ContainerDTO } from '../../Types/Container';
import { LinkDTO } from '../../Types/Item';

type InputControllerProps ={
    fieldName: string;
    control: Control<FieldValues, any>
    initialValue?: string;
    toggleDropdown: () => void;
    checkIfContainerExists: (scannerId: string) => boolean;
    setError: UseFormSetError<any>;
    clearErrors: UseFormClearErrors<any>;
};

const Input = ({fieldName, control, initialValue, toggleDropdown, checkIfContainerExists, setError, clearErrors }: InputControllerProps) => {
    const {
        field,
        fieldState: { error }
    } = useController({
        name: fieldName,
        control,
        defaultValue: initialValue || ''
    });
    
    const [value, setValue] = useState(String(field.value) || "");

    return (
        <>
            <input 
                {...field}
                className="form-control"
                onChange={(e) => {
                    setValue(e.target.value.trim());
                    field.onChange && field.onChange(e);
                }}
                onFocus={() => toggleDropdown()}
                onBlur={() => {
                    field.onBlur();
                    if(checkIfContainerExists(value)){
                        clearErrors(field.name);
                    } else {
                        setError(field.name, {message: 'Container ID does not exist'});
                    }
                }}
                value={ value }
                disabled={ initialValue !== '' }
            />
            {error && (
                <div className="flex-nowrap">
                    <li className='list-group-item text-danger'>
                        {`${error.message}`}
                    </li>
                </div>
            )}
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
    setValue: UseFormSetValue<any>;
    setFocus: UseFormSetFocus<any>;
    setError: UseFormSetError<any>;
    clearErrors: UseFormClearErrors<any>
    watchLinks: LinkDTO[];
};

const ComboBox = ({ containerDTOs, index, link, control, setValue, setFocus, setError, clearErrors, watchLinks }: ComboBoxProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        setFocus(`links.${index}.scannerId`);
    };

    const handleDropdownClick = (value: string) => {
        setValue(`links.${index}.scannerId`, value);
    };

    const checkIfContainerExists = (scannerId: string): boolean => {
        console.log('I got here!');
        toggleDropdown();
        console.log(watchLinks[index]);

        return scannerId.length > 0 && Boolean(containerDTOs?.some(container => container.scannerId === scannerId));
    };

    const toggleDropdown = () => {
        // const dropdownRef = inputRef.current;

        // if(dropdownRef){
        //     const dropdown = new Dropdown(dropdownRef);

        //     dropdown.toggle();
        // }
        console.log('focus');
    };

    return (
        <>
            <div className="input-group">
                <Input fieldName={ `links.${index}.scannerId` } control={ control } initialValue={ link.scannerId } toggleDropdown={ toggleDropdown } checkIfContainerExists={ checkIfContainerExists } setError={ setError } clearErrors={ clearErrors } />
                <ul className="dropdown-menu dropdown-menu-end w-100" style={{maxHeight: "200px", overflowY: "auto"}}> 
                    {containerDTOs && containerDTOs.map((containerDTO) => (
                        <li key={ `container-dropdown-${containerDTO.scannerId}` }><a className="dropdown-item" onClick={ () => handleDropdownClick(containerDTO.scannerId) }>{containerDTO.scannerId + ` (` + containerDTO.name + `)`}</a></li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ComboBox;