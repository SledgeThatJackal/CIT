import React, { useRef } from 'react';

import { ContainerDTO } from '../../Types/Container';
import { UseFormRegister } from 'react-hook-form';

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
    setValue: any;
    setFocus: any;
};

const ComboBox = ({ containerDTOs, register, setError, index, link, setValue, setFocus }: ComboBoxProps) => {

    const handleClick = () => {
        setFocus(`links.${index}.scannerId`);
    };

    const handleDropdownClick = (value: string) => {
        setValue(`links.${index}.scannerId`, value);
    };

    return (
        <div className="input-group">
            <input {...register(`links.${index}.scannerId`)} id={ `linkId-${index}` } className="form-control dropdown-toggle" defaultValue={ link.scannerId } disabled={ link.linkId !== undefined } data-bs-toggle="dropdown" aria-expanded="false" 
            onChange= { 
                (event) => {
                    setValue(`links.${index}.scannerId`, event.target.value.trim())
                }
            }

            onBlur= {
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