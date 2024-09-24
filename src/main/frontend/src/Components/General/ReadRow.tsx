import React from "react";
import { Accordion, Button, ButtonGroup } from 'react-bootstrap';

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
            <tr key={ `item-${index}` } className='table-secondary' id={ `item-${index}` } data-bs-toggle="collapse" data-bs-target={ `#ContainerRow-${index}` }>
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
                    <ButtonGroup aria-label="Component Functionality">
                        <Button variant="info" size="sm" onClick={() => onEdit(item.id) }>Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => onDelete(item.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
            {item?.containerItems && item.containerItems.length > 0 && (
                <Accordion.Collapse as="tr" eventKey={`${index}`} id={`ContainerRow-${index}`}>
                    <ContainerRow containerItems={ item.containerItems } index={ index } />
                </Accordion.Collapse>
            )}
        </>
    )
};

export default ReadRow;