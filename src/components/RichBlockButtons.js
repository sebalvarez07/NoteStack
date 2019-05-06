import React from 'react';
import StyleButtons from './StyleButtons';

const BLOCKTYPES = [
    { label: 'H1', style: 'header-two' },
    { label: 'H2', style: 'header-three' },
    { label: 'H3', style: 'header-four' },
    { label: 'Code Block', style: 'code-block' },
    { label: 'UL', style: 'unordered-list-item'},
    { label: 'OL', style: 'ordered-list-item'},
    { label: 'Quoteblock', style: 'blockquote' }
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