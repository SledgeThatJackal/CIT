import React, {useState} from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import axios from 'axios';

import { Tag } from '../../Types/Tag';
import TagBlock from './TagBlock';
import { ItemFormSchemaType } from '../../Types/Item';


type TagInputProps = {
    control: Control<ItemFormSchemaType>;
    name: 'item.tags';
};

const TagInput = ({ control, name }: TagInputProps) => {
    const [color, setColor] = useState<string>('#FF0000');
    const [newTagName, setNewTagName] = useState<string>('');
    const [tagError, setTagError] = useState<string>('');

    const { fields, append, remove } = useFieldArray({
        control,
        name,
        keyName: 'key',
    });

    const addTag = async () => {
        if(newTagName.length === 0){
            setTagError('The tag must have a value');
            return;
        }

        try{
            const tag: Tag = (await axios.post(`/api/tags/create`, {id: undefined, tag: newTagName, color: color})).data;

            append(tag);
            setNewTagName('');
            setTagError('');
        } catch (error){
            console.error(error);
        }
    };

    const removeTag = async (index: number) => {
        try{
            remove(index);
        } catch (error){
            console.error(error);
        }
    };

    return (
        <div>
            <div className='mb-3'>
                <label htmlFor='tagInput' className='form-label'>Tags</label>
                <div className='input-group'>
                    <input onChange={ (event) => setNewTagName(event.target.value) } type='text' value={ newTagName } id='tagInput' className='form-control w-75' />
                    <input type='color' className='form-control form-control-color' id='colorInput' value={ color } onChange={ (event) => setColor(event.target.value) } />
                    <button onClick={ addTag } type='button' className='btn btn-warning'>Add</button>
                </div>
                <div className='form-text text-info'>{tagError}</div>
            </div>

            {fields.map((tag, index) => (
                <TagBlock key={`tag-${tag.key}`} control={ control } name={`item.tags.${index}`} onDelete={ () => removeTag(index) } />
            ))}
        </div>
    );
};

export default TagInput;