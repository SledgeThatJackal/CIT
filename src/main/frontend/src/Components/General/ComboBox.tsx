import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { ContainerDTO } from '../../Types/Container';
import { LinkDTO } from '../../Types/Item';



type ComboBoxProps = {
    containerDTOs?: ContainerDTO[];
    watchLinks: LinkDTO[];
    register: UseFormRegister<any>;
    setError: any;
    index: number;
    errors: any;
    link: {
        quantity?: number | undefined;
        scannerId?: string | undefined;
        linkId?: number | null | undefined;
    } & Record<"id", string>;
    setValue: any;
    setFocus: any;
};

const ComboBox = ({ containerDTOs, watchLinks, register, setError, index, errors, link, setValue, setFocus }: ComboBoxProps) => {
    const handleClick = () => {
        setFocus(`links.${index}.scannerId`);
    };

    const handleDropdownClick = (value: string) => {
        setValue(`links.${index}.scannerId`, value);
    };

    return (
        <>
            <div className="input-group">
                <input {...register(`links.${index}.scannerId`)} id={ `linkId-${index}` } className="form-control dropdown-toggle" value={ watchLinks[index]?.scannerId || '' } disabled={ link.linkId !== undefined } data-bs-toggle="dropdown" aria-expanded="false" 
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

            {errors.links?.[index]?.scannerId && (
                <li className='list-group-item text-danger'>
                    {`${errors.links[index].scannerId.message}`}
                </li>
            )}
        </>
    );
};

export default ComboBox;