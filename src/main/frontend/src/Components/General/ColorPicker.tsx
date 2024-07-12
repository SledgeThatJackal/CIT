import React from 'react';
import { CompactPicker, Color, ColorResult } from 'react-color';

type ColorPickerProps = {
    color: Color;
    onChange: (color: ColorResult) => void
};

const ColorPicker = ({ color, onChange}: ColorPickerProps) => {
    return (
        <>
            <CompactPicker color={ color } onChange={ onChange } />
        </>
    );
};

export default ColorPicker;