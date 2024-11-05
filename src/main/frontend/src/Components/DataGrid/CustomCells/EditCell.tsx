import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const EditCell = ({ getValue, row: { index }, column: { id }, table }: any) => {
    const initialValue = getValue();
    const [value, setValue] = useState<string>(initialValue);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isCancelled, setIsCancelled] = useState<boolean>(false);

    const onChange = (e: any) => {
        setValue(e.target.value);
    }

    const onBlur = async () => {
        if(!isCancelled){
            table.options.meta?.updateData(index, id, value);
        }

        setIsEditing(false);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleEnter = (event: React.KeyboardEvent<any>) => {
        if(event.key === 'Enter'){
            onBlur();
        }

        if(event.key === 'Escape'){
            setIsCancelled(true);
            setIsEditing(false);
        }
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
        setIsCancelled(false);
    };

    return(
        <>
            {isEditing ? (
                <Form.Control type="text" value={ value } onChange={ onChange } onBlur={ onBlur } onKeyDown={ handleEnter } autoFocus />
            ) : (
                <span onDoubleClick={ handleDoubleClick }>{value}</span>
            )}
        </>
    );
};

export default EditCell;