import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDetailedContainers } from '../../../services/queries';

const ParentContainerCell = ({ getValue, row: { index }, table }: any) => {
    const containersQuery = useDetailedContainers().data;
    const tableValue = getValue();

    if(!containersQuery){
        return(
            <div>
                No Containers Found
            </div>
        );
    }

    const initialValue = tableValue ? containersQuery.find(container => container.id === tableValue.id)?.id : -1;

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const onChange = (e: any) => {
        const selectedValue = e.target.value;

        table.options.meta?.updateParentContainer(index, selectedValue);

        setIsEditing(false);
    };

    return(
        <>
            {isEditing ? (
                <Form.Select onChange={ onChange } value={ initialValue }>
                    <option value={ -1 } key={ "default-option" }></option>
                    {containersQuery ? containersQuery.map((container, mapIndex) => (
                        <option key={ `options-${container.id}` } value={ container.id } disabled={ container.id === table.options.meta?.getContainerId(index) }>{container.name}</option>
                    )) : (
                        <option key={ `no-options` }>No Containers found</option>
                    )}
                </Form.Select>
            ) : (
                <span onDoubleClick={ () => setIsEditing(true) }>{tableValue ? tableValue.name : "N/A"}</span>
            )}
        </>
    );
};

export default ParentContainerCell;