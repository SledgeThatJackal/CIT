import React from 'react';
import { useFieldArray, Control, FieldValues } from 'react-hook-form';

import { Tag } from '../../Types/Tag';
import TagBlock from './TagBlock';
import { Item, ItemFormSchemaType } from '../../Types/Item';


type TagInputProps = {
    control: Control<ItemFormSchemaType>;
    name: 'item.tags';
};

const TagInput = ({ control, name }: TagInputProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name
    });

    return (
        <div>
            {fields.map((tag, number) => (
                <TagBlock control={ control } name={`item.tags.${number}`} />
            ))}
        </div>
    );
};

export default TagInput;