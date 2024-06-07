import React from 'react';
import { createRoot } from 'react-dom/client';
import ContainerTable from "./src/Components/ContainerTable.jsx";

document.addEventListener('DOMContentLoaded', () => {
    const containerTable = document.getElementById('containerTable');

    if(containerTable){
        const root = createRoot(containerTable);
        root.render(React.createElement(ContainerTable));
    }
});