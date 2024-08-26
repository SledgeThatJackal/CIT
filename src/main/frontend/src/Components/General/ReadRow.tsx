import React from "react";

import { Item } from '../../Types/Item';
import TagBadge from '../Tag/TagBadge';
import ContainerRow from './ContainerRow';

type ReadRowProps = {
    item: Item;
    index: number;
    onDelete: React.Dispatch<React.SetStateAction<number>>;
    onEdit: any;
};

const ReadRow = ( { item, index, onDelete, onEdit }: ReadRowProps ) => {

    return (
        <>
            <tr key={`item-${index}`} className='table-secondary' data-bs-toggle="collapse" data-bs-target={`#containers-${item.id}`} aria-expanded={false} aria-controls={`containers-${item.id}`}>
                <th scope="row">{item.name}</th>
                <td>{item.description}</td>
                <td>
                    {item.tags && item.tags.length > 0 && (
                        <>
                            {item.tags.map((tag, tagIndex) => (
                                <TagBadge key={`tag-${index}-${tagIndex}`} tag={ tag } />
                            ))}
                        </>
                    )}
                </td>

                <td>
                    <div className='btn-group'>
                        <button type="button" className="btn btn-info btn-sm" onClick={() => onEdit(item.id) }>Edit</button>
                        <button type="button" onClick={() => onDelete(item.id)} className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#confirmationModal">Delete</button>
                    </div>
                </td>
            </tr>

            {item?.containerItems && item.containerItems.length > 0 && (
                <tr className='table-secondary'>
                    <td colSpan={5} className='collapse' id={`containers-${item.id}`}>
                        <ContainerRow containerItems={ item.containerItems } index={ index } />
                    </td>
                </tr>
            )}
        </>
    )
};

export default ReadRow;