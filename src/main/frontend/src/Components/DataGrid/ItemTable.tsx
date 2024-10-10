import React, { useEffect, useMemo, useState } from 'react';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { ColDef, ValueGetterParams, ValueSetterParams } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from 'axios';

import { Item } from '../../Types/Item';
import Tags from './Tags';
import { Tag } from '../../Types/Tag';
import { Button } from 'react-bootstrap';

type TItemTableProps = {
    tags: Tag[];
    onDelete: React.Dispatch<React.SetStateAction<number>>;
};

function TItemTable({ tags, onDelete }: TItemTableProps){
    const [rows, setRows] = useState<Item[]>();

    const [colDefs, setColDefs] = useState<ColDef[]>([
        { field: "name", editable: true, valueSetter: (params: ValueSetterParams) => {
            const newValue = params.newValue;
            const isDirty = params.data.name !== newValue;
            if(isDirty){
                params.data.name = newValue;
                patchData(params.data);
            }

            return isDirty;
        } },
        { field: "description", editable: true, valueSetter: (params: ValueSetterParams) => {
            const newValue = params.newValue;
            const isDirty = params.data.description !== newValue;
            if(isDirty){
                params.data.description = newValue;
                patchData(params.data);
            }

            return isDirty;
        } },
        { field: "tags", cellRenderer: Tags, editable:true, cellEditor: 'agSelectCellEditor', cellEditorParams: {
            values: ''
        }, 
        valueGetter: (params: ValueGetterParams) => params.data.tags,
        valueSetter: (params: ValueSetterParams) => {
            const newTag = params.newValue;

            if(newTag.length < 1){
                return false;
            }

            const itemTags = params.data.tags;
            const tagToAlter = tags.find((tag: Tag) => tag.tag === newTag);
            const isDuplicate = itemTags.some((tag: Tag) => tag.tag === newTag);

            if(isDuplicate){
                itemTags.pop(tagToAlter);
            } else {
                itemTags.push(tagToAlter);
            }

            patchData(params.data);

            return true;
        } },
        { headerName: "Delete", cellRenderer: (params: CustomCellRendererProps<Item>) => (<Button variant="danger" size="sm" onClick={ () => handleDelete(params.data?.id || -1) }><i className="bi bi-trash" /></Button>) } 
    ]); // { field: "" },    

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            filter: true,
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const items = (await axios.get(`/api/item/c`)).data;
            setRows(items);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const tagsString = tags.map(tag => tag.tag) as string[];
        const newValues = ['', ...tagsString];

        const updatedColDef = colDefs.map((colDef) => {
            if(colDef.field === 'tags'){
                return {
                    ...colDef,
                    cellEditorParams: {
                        ...colDef.cellEditorParams,
                        values: newValues
                    }

                }
            }

            return colDef;
        });

        setColDefs(updatedColDef);
    }, [tags]);

    const patchData = async (data: Item) => {
        try{
            await axios.patch(`/api/item/edit/test`, data);
        } catch (error) {
            console.error("Failed to update data: ", error);
        }
    };

    const handleDelete = async (id: number) => {
        if(id === -1){
            return;
        }

        try{
            onDelete(id);
            setRows(rows?.filter(row => row.id !== id));
        } catch (error){
            console.error('Error deleteing entry: ', error);
        }
    };

    return (
        <div className="ag-theme-quartz-dark" style={{ height: "65vh" }}>
            {tags && tags.length > 0 && (
                <AgGridReact<Item> rowData={ rows } columnDefs={ colDefs } defaultColDef={ defaultColDef }  /> 
            )}
        </div>
    );
};

export default TItemTable;