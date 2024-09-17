import React, { useRef } from 'react';

const ComboBox = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    function handleClick(){
        inputRef.current?.focus();
    };

    return (
        <div className="input-group">
            <input type="text" className="form-control dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" ref={ inputRef } />
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={ handleClick }></button>
            <ul className="dropdown-menu dropdown-menu-end w-100" style={{maxHeight: "200px", overflowY: "auto"}}> 
                <li><a className="dropdown-item">Test 1</a></li>
                <li><a className="dropdown-item">Test 2</a></li>
                <li><a className="dropdown-item">Test 3</a></li>
            </ul>
        </div>
    );
};

export default ComboBox;