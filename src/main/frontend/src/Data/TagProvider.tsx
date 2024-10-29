import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { Tag } from '../Types/Tag';

const DataContext = createContext<Tag[]>([]);

export const TagProvider = ({ children }: any) => {
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        const fetchTags = async () => {
            try{
                const tags = sessionStorage.getItem("tags");

                if(tags){
                    setTags(JSON.parse(tags));
                } else {
                    const response = (await axios.get<Tag[]>('/api/tags')).data;
                       
                    setTags(response);
                    sessionStorage.setItem("tags", JSON.stringify(response));
                }
            } catch (error){
                console.log('Request failed: ', error);
            }
        };

        fetchTags();
    }, []);

    return (
        <DataContext.Provider value={ tags }>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);