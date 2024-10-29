import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const EditCell = ({ getValue, row: { index }, column: { id }, table }: any) => {
    const initialValue = getValue();
    const [value, setValue] = useState<string>(initialValue);

    const onChange = (e: any) => {
        setValue(e.target.value);
    }

    const onBlur = async () => {
        table.options.meta?.updateData(index, id, value);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return(
        <Form.Control type="text" value={ value } onChange={ onChange } onBlur={ onBlur } />
    );
};

export default EditCell;