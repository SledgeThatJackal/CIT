import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tag } from '../../Types/Tag';

const TagSelect = () => {
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = (await axios.get<Tag[]>('/api/tags')).data;
            setTags(response);
        };

        fetchData();
    }, []);

    return(
        <div></div>
    );
};

export default TagSelect;