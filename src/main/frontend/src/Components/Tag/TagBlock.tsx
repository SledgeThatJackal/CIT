import React from 'react';
import { useController, Control } from 'react-hook-form';

import { ItemFormSchemaType } from '../../Types/Item';

type TagBlockProps = {
    control: Control<ItemFormSchemaType>;
    name: `item.tags.${number}`;
    onDelete: () => Promise<void>;
};

const TagBlock = ({ control, name, onDelete }: TagBlockProps) => {
    const { field } = useController({
        control,
        name
    });

    const tagColor = field.value.color.replace('#', '');

    // Darken base color
    const colorValue = (parseInt(tagColor, 16) & 0xfefefe) >> 1; 

    // Turn the numbered color back into a hex number and pad the start, if there's not enough values
    const darkerColor = `#${colorValue.toString(16).padStart(6, '0')}`;

    return (
        <div className='d-inline-flex badge rounded-pill align-items-center' style={{
            backgroundColor: field.value.color,
            border: `3px solid ${darkerColor}`,
            marginRight: 3,
        }}>
            <span style={{
                color: darkerColor,
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