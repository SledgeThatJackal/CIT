import React from 'react';

export default function DatabaseExportButton(){

    return (
        <a type='button' href={`/api/exim/export`} download className="btn btn-success btn-sm">
            Export
        </a>
    );
}