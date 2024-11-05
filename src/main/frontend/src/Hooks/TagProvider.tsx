import React, { createContext, useContext, useEffect, useState } from 'react';

import { Tag } from '../Types/Tag';
import { useTags } from '../Services/queries';

const DataContext = createContext<Tag[]>([]);

export const TagProvider = ({ children }: any) => {
    const tagsQuery = useTags();

    if(tagsQuery.isPending){
        return null;
    }

    if(tagsQuery.isError){
        return null;
    }

    return (
        <DataContext.Provider value={ tagsQuery.data }>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);