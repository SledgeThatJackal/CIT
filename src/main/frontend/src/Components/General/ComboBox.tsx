import React, { useState, useRef } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { ContainerDTO } from '../../Types/Container';

type ComboBoxProps = {
    containerDTOs?: ContainerDTO[];
    register: UseFormRegister<any>;
    setError: any;
    index: number;
    link: {
        quantity?: number | undefined;
        scannerId?: string | undefined;
        linkId?: number | null | undefined;
    } & Record<"id", string>;
};

const ComboBox = ({ containerDTOs, register, setError, index, link }: ComboBoxProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState<string | undefined>(undefined);

    const handleClick = () => {
        inputRef.current?.focus();
    };

    const handleDropdownClick = (value: string) => {
        setInputValue(value);
        handleClick();
    };

    return (
        <div className="input-group">
            <input {...register(`links.${index}.scannerId`)} id={ `linkId-${index}` } className="form-control dropdown-toggle" defaultValue={ link.scannerId } disabled={ link.linkId !== undefined } data-bs-toggle="dropdown" aria-expanded="false" ref={ inputRef } value={ inputValue } onBlur= {
                (event) => {
                    const scannerId = event.target.value.trim();

                    if(scannerId && !containerDTOs?.find(container => container.scannerId === scannerId)){
                        setError(`links.${index}.scannerId`, {message: "Container ID does not exist"})
                    }
                }
            } />
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled={ link.linkId !== undefined } onClick={ handleClick }></button>
            <ul className="dropdown-menu dropdown-menu-end w-100" style={{maxHeight: "200px", overflowY: "auto"}}> 
                {containerDTOs && containerDTOs.map((containerDTO) => (
                    <>
                        <li><a className="dropdown-item" onClick={ () => handleDropdownClick(containerDTO.scannerId) }>{containerDTO.scannerId + ` (` + containerDTO.name + `)`}</a></li>
                    </>
                ))}
            </ul>
        </div>
    );
};

export default ComboBox;