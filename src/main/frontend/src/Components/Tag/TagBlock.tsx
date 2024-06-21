import React from 'react';
import { Tag } from '../../Types/Tag';
import { Item } from '../../Types/Item';

import axios from 'axios';

type TagBlockProps = {
    tag: Tag
};

const TagBlock = ({ tag }: TagBlockProps) => {
    return (
        <div className='rounded-pill border d-inline-flex p-2' style={{
            backgroundColor: tag.color,
        }}>
            {tag.name}
            <button className="btn-close" aria-label="Close"></button>
        </div>
    );
};

export default TagBlock;