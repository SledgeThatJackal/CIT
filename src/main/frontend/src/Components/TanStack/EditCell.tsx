import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const EditCell = ({ getValue, row, column, table }: any) => {
    const defaultValue: string = getValue();
    const [value, setValue] = useState<string>(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue])

    const onBlur = async () => {
        // const itemId = table.options.meta?.getItemId(row.index);

        // try{
        //     await axios.patch(`/api/item/edit?itemId=${itemId}&column=${column.id}&value=${value}`);
        // } catch (error) {
        //     console.error("Failed Request: ", error);
        // }

        table.options.meta?.updateData(row.index, column.id, value);
    };

    return(
        <Form.Control type="text" value={ value } onChange={ e => setValue(e.target.value) } onBlur={ onBlur } />
    );
};

export default EditCell;