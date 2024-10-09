import React from 'react';
import { CustomCellRendererProps } from 'ag-grid-react';

import TagBadge from '../Tag/TagBadge';

import { Tag } from '../../Types/Tag';

function Tags(params: CustomCellRendererProps<Tag[]>){

    return (
        <React.Fragment>
            {params.value && params.value.length > 0 && params.value.map((tag: Tag) => (
                <TagBadge tag={ tag } key={ `tag-${tag.id}` } />
            ))}
        </React.Fragment>
    );
};

export default Tags;