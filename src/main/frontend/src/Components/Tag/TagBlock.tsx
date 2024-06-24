import React from 'react';
import { useController, Control } from 'react-hook-form';

import { ItemFormSchemaType } from '../../Types/Item';

type TagBlockProps = {
    control: Control<ItemFormSchemaType>;
    name: `item.tags.${number}`;
    onDelete: () => Promise<void>;
};

const TagBlock = ({ control, name, onDelete }: TagBlockProps) => {
    const { field, fieldState } = useController({
        control,
        name
    });

    return (
        <div className='d-inline-flex badge rounded-pill align-items-center' style={{
            backgroundColor: field.value.color,
        }}>
            <span style={{
                color: field.value.color,
                mixBlendMode: 'multiply',
                paddingRight: 10,
                whiteSpace: 'nowrap',
            }}>
                {field.value.tag}
            </span>

            <button type='button' className="btn-close" aria-label="Close" onClick={ onDelete }></button>
        </div>
    );
};

export default TagBlock;