import { Row } from '@tanstack/react-table';
import React from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { Item } from '../../../cit_types/Item';
import { useActionState } from '../../../state/useActionState';

type ActionButtonsProps = {
    table: any;
    row: Row<Item>;
};

const ActionButtons = ({ row }: ActionButtonsProps) => {
    const { isVisible, callerId, updateAction } = useActionState();

    const isActive = isVisible && callerId === row.getValue("id");

    const handleOpen = () => {
        updateAction(true, row.original, row.getValue("id"))
    };

    const handleClose = () => {
        updateAction(false, undefined, undefined);
    };

    return(
        <InputGroup>
            <Button size="sm" {...{onClick: row.getToggleExpandedHandler()}} disabled={ !row.getCanExpand() }>
                    {row.getIsExpanded() ? '▲' : '▼'}
            </Button>
            {isActive ? (
                <Button variant="info" size="sm" onClick={ handleClose }>●</Button>
            ) : (
                <Button variant="success" size="sm" onClick={ handleOpen }>+</Button>
            )}
        </InputGroup>
    );
};

export default ActionButtons