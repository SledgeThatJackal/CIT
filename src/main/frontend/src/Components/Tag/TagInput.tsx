import React, {useState} from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import { ColorResult } from 'react-color';
import axios from 'axios';

import { Tag } from '../../Types/Tag';
import TagBlock from './TagBlock';
import { ItemFormSchemaType } from '../../Types/Item';
import ColorPicker from '../General/ColorPicker';


type TagInputProps = {
    control: Control<ItemFormSchemaType>;
    name: 'item.tags';
};

const TagInput = ({ control, name }: TagInputProps) => {
    const [color, setColor] = useState<string>('#fff');
    const [newTagName, setNewTagName] = useState<string>('');

    const { fields, append, remove } = useFieldArray({
        control,
        name,
        keyName: 'key',
    });

    const handleColorChange = (color: ColorResult) => {
        setColor(color.hex);
    };

    const addTag = async () => {
        try{
            const tag: Tag = (await axios.post(`/api/tags/create`, {id: undefined, tag: newTagName, color: color})).data;

            append(tag);
            setNewTagName('');
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
            <label htmlFor='tagInput' className='form-label'>Tags</label>
            <input onChange={ (event) => setNewTagName(event.target.value) } type='text' value={ newTagName } id='tagInput' className='form-control' />
            <ColorPicker color={ color } onChange={ handleColorChange } />
            <button onClick={ addTag } type='button' className='btn btn-warning'>Add</button>
            {fields.map((tag, index) => (
                <TagBlock key={`tag-${tag.key}`} control={ control } name={`item.tags.${index}`} onDelete={ () => removeTag(index) } />
            ))}
        </div>
    );
};

export default TagInput;