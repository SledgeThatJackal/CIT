import React from 'react';
import { useController, Control, FieldValues } from 'react-hook-form';
import axios from 'axios';

import { Tag, TagSchemaType } from '../../Types/Tag';
import { Item, ItemFormSchemaType } from '../../Types/Item';

type TagBlockProps = {
    control: Control<ItemFormSchemaType>;
    name: `item.tags.${number}`;
};

const TagBlock = ({ control, name }: TagBlockProps) => {
    const { field, fieldState } = useController({
        control,
        name
    });

    return (
        <div className='rounded-pill border d-inline-flex p-2' style={{
            backgroundColor: field.value.color
        }}>
            {field.value.name}
            <button className="btn-close" aria-label="Close"></button>
        </div>
    );
};

export default TagBlock;