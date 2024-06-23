import React from 'react';
import { ChromePicker, Color, ColorResult } from 'react-color';

type ColorPickerProps = {
    color: Color;
    onChange: (color: ColorResult) => void
};

const ColorPicker = ({ color, onChange}: ColorPickerProps) => {
    return (
        <>
            <ChromePicker color={ color } onChange={ onChange } />
        </>
    );
};

export default ColorPicker;