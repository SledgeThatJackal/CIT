import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDetailedContainers } from '../../../services/queries';

const ParentContainerCell = ({ getValue, row: { index }, column: { id }, table }: any) => {
    const containersQuery = useDetailedContainers().data;
    const tableValue = getValue();

    if(!containersQuery){
        return(
            <div>
                No Containers Found
            </div>
        );
    }

    const initialValue = tableValue ? containersQuery.findIndex(container => container.id === tableValue.id) : -1;

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const onChange = (e: any) => {
        const selectedValue = e.target.value;

        const container = selectedValue < 0 ? undefined : containersQuery[selectedValue];

        table.options.meta?.updateData(index, id, container);

        setIsEditing(false);
    };

    return(
        <>
            {isEditing ? (
                <Form.Select onChange={ onChange } value={ initialValue }>
                    <option value={ -1 }></option>
                    {containersQuery ? containersQuery.map((container, mapIndex) => (
                        <option value={ mapIndex } disabled={ container.id === table.options.meta?.getContainerId(index) }>{container.name}</option>
                    )) : (
                        <option>No Containers found</option>
                    )}
                </Form.Select>
            ) : (
                <span onDoubleClick={ () => setIsEditing(true) }>{tableValue ? tableValue.name : "N/A"}</span>
            )}
        </>
    );
};

export default ParentContainerCell;