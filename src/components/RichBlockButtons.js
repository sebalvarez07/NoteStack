import React from 'react';
import StyleButtons from './StyleButtons';

const BLOCKTYPES = [
    { label: 'Title 1', style: 'header-two' },
    { label: 'Title 2', style: 'header-three' },
    { label: 'Title 3', style: 'header-four' },
    { label: 'Code Block', style: 'code-block' },
    { label: 'List Bullets', style: 'unordered-list-item'},
    { label: 'List Numbered', style: 'ordered-list-item'},
    { label: 'Qoute', style: 'blockquote' }
];

const RichBlockButtons = ({editorState, onBlockButtonClick}) => {

    const selection = editorState.getSelection();
    const currentType =  editorState
                    .getCurrentContent()
                    .getBlockForKey(selection.getStartKey())
                    .getType();

    return (
        <div>
            { BLOCKTYPES.map(blocktype => {
                return  <StyleButtons 
                            editorState={editorState}
                            key={blocktype.label}
                            label={blocktype.label}
                            style={blocktype.style}
                            onToggle={onBlockButtonClick}
                            active={currentType === blocktype.style}
                        />
            }) 
            }
        </div>
    )
};

export default RichBlockButtons;