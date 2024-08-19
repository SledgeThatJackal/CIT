import React from "react";

import { ItemDTO } from '../../Types/Item';
import TagBadge from '../Tag/TagBadge';
import ContainerRow from './ContainerRow';

type ReadRowProps = {
    itemDTO: ItemDTO;
    index: number;
    onDelete: React.Dispatch<React.SetStateAction<number>>;
    onEdit: any;
};

const ReadRow = ( { itemDTO, index, onDelete, onEdit }: ReadRowProps ) => {

    return (
        <>
            <tr key={`item-${index}`} data-bs-toggle="collapse" data-bs-target={`#containers-${itemDTO.item.id}`} aria-expanded={false} aria-controls={`containers-${itemDTO.item.id}`}>
                <th scope="row">{itemDTO.item.id}</th>
                <td>{itemDTO.item.name}</td>
                <td>{itemDTO.item.description}</td>
                <td>
                    {itemDTO.item.tags && itemDTO.item.tags.length > 0 && (
                        <>
                            {itemDTO.item.tags.map((tag, tagIndex) => (
                                <TagBadge key={`tag-${index}-${tagIndex}`} tag={ tag } />
                            ))}
                        </>
                    )}
                </td>

                <td>
                    <div className='btn-group'>
                        <button type="button" className="btn btn-info btn-sm" onClick={() => onEdit(itemDTO.item.id) }>Edit</button>
                        <button type="button" onClick={() => onDelete(itemDTO.item.id)} className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#confirmationModal">Delete</button>
                    </div>
                </td>
            </tr>

            {itemDTO.containers.length > 0 && (
                <tr>
                    <td colSpan={5} className='collapse' id={`containers-${itemDTO.item.id}`}>
                        <ContainerRow containers={ itemDTO.containers } index={ index } />
                    </td>
                </tr>
            )}
        </>
    )
};

export default ReadRow;