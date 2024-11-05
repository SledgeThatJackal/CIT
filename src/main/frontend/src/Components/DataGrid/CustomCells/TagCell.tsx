import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

import TagBadge from '../../Tag/TagBadge';

import { Tag } from '../../../Types/Tag';
import { createPortal } from 'react-dom';
import { useData } from '../../../Hooks/TagProvider';

const tagStringCompare = (tag1: Tag, tag2: Tag) => {
    return tag1.tag.localeCompare(tag2.tag);
};

const TagCell = ({ getValue, row: { index }, column: { id }, table }: any) => {
    const initialValue = getValue();
    const [value, setValue] = useState<Tag[]>(initialValue);

    const [show, setShow] = useState<boolean>(false);
    const dropdownToggle = () => {
        handleResize();
        setShow(!show);
    };

    const targetRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0, x: 0, y: 0});

    const handleResize = () => {
        if(targetRef.current){
            const { width, height, x, y } = targetRef.current.getBoundingClientRect();
            setDimensions({ width, height, x, y });
        }
    };

    useEffect(() => {
        const resizeObserver = new ResizeObserver(handleResize);

        if(targetRef.current){
            resizeObserver.observe(targetRef.current);
        }

        return () => {
            if(targetRef.current){
                resizeObserver.unobserve(targetRef.current);
            }
        };
    }, []);

    const addTag = (newTag: Tag) => {
        const newValue = [...value, newTag]; 

        setValue(newValue);
        table.options.meta?.updateData(index, id, newValue);
    };

    const removeTag = (tagToRemove: Tag) => {
        const newValue = value.filter(tag => tag.id !== tagToRemove.id); 

        setValue(newValue);
        table.options.meta?.updateData(index, id, newValue);
    };

    return(
        <div ref={ targetRef }>
            {value && value.length > 0 && value.sort((a, b) => tagStringCompare(a, b)).map((tag) => (
                <TagBadge tag={ tag } key={ `tag-${tag.id}` } />
            ))}
            <Dropdown className="d-inline-flex" show={ show } onToggle={ dropdownToggle } >
                <Dropdown.Toggle className="ms-auto" variant='secondary'><i className='bi bi-gear' style={{ fontSize: '14px' }}></i></Dropdown.Toggle>
                
                <Dropdown.Menu as={ CustomMenu } show={ show } dimensions={ dimensions }>
                    <TagMenu currentTags={ value } addTag={ addTag } removeTag={ removeTag } />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

type TagMenuProps = {
    currentTags: Tag[];
    addTag: (newTag: Tag) => void;
    removeTag: (tagToRemove: Tag) => void;
};

const TagMenu = ({ currentTags, addTag, removeTag }: TagMenuProps) => {
    const tags = useData();

    const [search, setSearch] = useState<string>("");
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

    useEffect(() => {
        if(tags){
            setFilteredTags(tags.filter(tag => tag.tag.toLowerCase().includes(search.toLowerCase())));
        }
    }, [tags, search]);

    const checkIfTagExists = (tagToCheck: Tag) => {
        return currentTags.some(tag => tag.id === tagToCheck.id);
    };

    return(
        <>
            <Dropdown.Header>
                <Form.Control type="text" value={ search } onChange={ e => setSearch(e.target.value) } placeholder="Search" />
            </Dropdown.Header>
            {filteredTags.length > 0 ? filteredTags.sort((a, b) => tagStringCompare(a, b)).map((tag, index) => {
                const tagExists = checkIfTagExists(tag);

                return (
                <Dropdown.Item key={ `db-tags-${index}` } onClick={ () => tagExists ? removeTag(tag) : addTag(tag) }>
                    <span style={{ paddingRight: "10px"}}>{tagExists ? "✔️" : "❌"}</span><TagBadge tag={ tag } />
                </Dropdown.Item>
            )}) : (
                <Dropdown.Item disabled>No tags were found</Dropdown.Item>
            )}
        </>
    );
};

type CustomMenuProps = {
    show: boolean;
    children: any;
    dimensions: {
        width: number;
        height: number;
        x: number;
        y: number;
    }
};

const CustomMenu = React.forwardRef(({ show, children, dimensions }: CustomMenuProps) => {
    return show ? createPortal(
        <div className="dropdown-menu show" style={{ position: 'absolute', zIndex: 1050, overflowY: "auto", height: "300px", width: `${dimensions.width}px`, left: `${dimensions.x}px`, top: `${dimensions.y + dimensions.height + 3}px` }}>
            {children}
        </div>, document.body
    ) : null;
});

export default TagCell;