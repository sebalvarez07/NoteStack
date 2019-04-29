import React from 'react';
import StyleButtons from './StyleButtons';

const INLINETYPES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

const RichInlineButtons = ({editorState, onInlineButtonClick}) => {

    const currentStyle = editorState.getCurrentInlineStyle();

    return (
        <div>
            { INLINETYPES.map(type => {
                return  <StyleButtons
                            active={currentStyle.has(type.style)}
                            editorState={editorState}
                            key={type.label}
                            label={type.label}
                            style={type.style}
                            onToggle={onInlineButtonClick}
                        />
            }) 
            }
        </div>
    )
};

export default RichInlineButtons;