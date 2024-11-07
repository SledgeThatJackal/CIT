import { Row } from '@tanstack/react-table';
import React from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { Item } from '../../../cit_types/Item';
import { useActionState } from '../../../state/useActionState';
import { useCanvasState } from '../../../state/useCanvasState';
import LinkBox from '../item/LinkBox';

type ActionButtonsProps = {
    table: any;
    row: Row<Item>;
};

const ActionButtons = ({ row }: ActionButtonsProps) => {
    const { callerId, updateAction, clearAction } = useActionState();
    const { openCanvas, closeCanvas } = useCanvasState();

    const isActive = callerId === row.getValue("id");

    const handleOpen = () => {
        openCanvas(LinkBox, `Editing: ${row.getValue("name")}`);
        updateAction(row.original, row.getValue("id"));
    };

    const handleClose = () => {
        closeCanvas();
        clearAction();
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