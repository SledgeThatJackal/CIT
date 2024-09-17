import React, { useState, useEffect } from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import axios from 'axios';

import TagBlock from './TagBlock';
import TagBadge from './TagBadge';

import { Tag } from '../../Types/Tag';
import { ItemFormSchemaType } from '../../Types/Item';


type TagInputProps = {
    control: Control<ItemFormSchemaType>;
    name: 'item.tags';
};

const TagInput = ({ control, name }: TagInputProps) => {
    const [color, setColor] = useState<string>('#FF0000');
    const [newTagName, setNewTagName] = useState<string>('');
    const [tagError, setTagError] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);

    const { fields, append, remove } = useFieldArray({
        control,
        name,
        keyName: 'key',
    });

    useEffect(() => {
        const fetchTags = async () => {
            try{
                const response = (await axios.get<Tag[]>('/api/tags')).data;

                setTags(response);
            } catch (error){
                console.log('Request failed: ', error);
            }
        };

        fetchTags();
    }, [fields]);

    const addTag = async (tag ?: Tag) => {
        var newTag: Tag;
        console.log('Add Tag');

        if(tag){
            newTag = tag;
        } else {
            try{
                console.log('Try');
                if(newTagName.length === 0){
                    setTagError('The tag must have a value');
                    return;
                }
    
                newTag = (await axios.post(`/api/tags/create`, {id: undefined, tag: newTagName, color: color})).data;
                console.log('newTag');
            } catch (error){
                console.error(error);
                return;
            }
        }

        append(newTag);
        setNewTagName('');
        setTagError('');
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
                <div className='input-group'>
                    <input onChange={ (event) => setNewTagName(event.target.value) } type='text' value={ newTagName } id='tagInput' className='form-control w-75 dropdown-toggle dropdown-toggle-split' data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent" />
                    <div className='dropdown-menu w-100' aria-labeled='tagInput'>
                        {tags.length > 0 && tags.filter(tag => {
                            const term = newTagName.toLowerCase();
                            const tagName = tag.tag.toLowerCase();

                            if(term.length > 0 && !tagName.startsWith(term)){
                                // Remove any tags that don't match the search term, if there is a term
                                return false;
                            }

                            return !fields.some(fieldsTag => fieldsTag.tag.toLowerCase() === tagName); // Remove any existing tags from the search
                        }).map((tag, index) => (
                            <button key={`db-tags-${index}`} type='button' className='drowndown-item' onClick={() => addTag(tag)} style={{
                                border: 0,
                                backgroundColor: 'white',
                            }}>
                                <TagBadge tag={ tag } />
                            </button>
                        ))}
                    </div>

                    <input type='color' className='form-control form-control-color' id='colorInput' value={ color } onChange={ (event) => setColor(event.target.value) } />
                    <button onClick={ () => addTag() } type='button' className='btn btn-warning'>Add</button>
                </div>
                <div className='form-text text-danger'>{tagError}</div>
            </div>

            {fields.map((tag, index) => (
                <TagBlock key={`tag-${tag.key}`} control={ control } name={`item.tags.${index}`} onDelete={ () => removeTag(index) } />
            ))}
        </div>
    );
};

export default TagInput;