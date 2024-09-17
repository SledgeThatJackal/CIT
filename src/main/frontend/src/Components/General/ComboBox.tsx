import React, { useState, useRef } from 'react';

const ComboBox = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState<string | undefined>(undefined);

    let exampleData = ['Test1', 'Test2', 'Test3'];

    const handleClick = () => {
        inputRef.current?.focus();
    };

    const handleDropdownClick = (value: string) => {
        setInputValue(value);
        handleClick();
    };

    return (
        <div className="input-group">
            <input type="text" className="form-control dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" ref={ inputRef } value={ inputValue } />
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={ handleClick }></button>
            <ul className="dropdown-menu dropdown-menu-end w-100" style={{maxHeight: "200px", overflowY: "auto"}}> 
                <li><a className="dropdown-item" onClick={ () => handleDropdownClick(exampleData[0]) }>{exampleData[0]}</a></li>
                <li><a className="dropdown-item" onClick={ () => handleDropdownClick(exampleData[1]) }>{exampleData[1]}</a></li>
                <li><a className="dropdown-item" onClick={ () => handleDropdownClick(exampleData[2]) }>{exampleData[2]}</a></li>
            </ul>
        </div>
    );
};

export default ComboBox;