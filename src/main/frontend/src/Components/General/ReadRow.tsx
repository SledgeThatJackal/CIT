import React, { useState } from "react";

import { Item } from '../../Types/Item';
import TagBadge from '../Tag/TagBadge';
import ContainerRow from './ContainerRow';

type ReadRowProps = {
    item: Item;
    index: number;
    onDelete: React.Dispatch<React.SetStateAction<number>>;
    onEdit: any;
};

 // data-bs-toggle="modal" data-bs-target="#confirmationModal"

const ReadRow = ( { item, index, onDelete, onEdit }: ReadRowProps ) => {
    const [isVisble, setIsVisble] = useState<boolean>(false);

    return (
        <>
            <tr key={ `item-${index}` } className='table-secondary' id={ `item-${index}` }>
                <th scope="row">{item.name}</th>
                <td>{item.description}</td>
                <td>
                    {item.tags && item.tags.length > 0 && (
                        <>
                            {item.tags.map((tag, tagIndex) => (
                                <TagBadge key={ `tag-${index}-${tagIndex}`} tag={ tag } />
                            ))}
                        </>
                    )}
                </td>

                <td>
                    <div className='btn-group'>
                        <button type="button" className="btn btn-info btn-sm" onClick={() => onEdit(item.id) }>Edit</button>
                        <button className={`btn btn-sm ${isVisble ? 'btn-warning' : 'btn-success'}`} type='button' onClick={ () => setIsVisble(!isVisble) }>
                            <i className={`bi ${isVisble ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
                        </button>
                        <button type="button" onClick={() => onDelete(item.id)} className="btn btn-danger btn-sm" >Delete</button>
                    </div>
                </td>

            </tr>

            {item?.containerItems && item.containerItems.length > 0 && (
                <tr className={ isVisble ? 'table-secondary collapse show' : 'table-secondary collapse'} id={`containers-${item.id}`}>
                    <td colSpan={6}>
                        <ContainerRow containerItems={ item.containerItems } index={ index } />
                    </td>
                </tr>
            )}
        </>
    )
};

export default ReadRow;