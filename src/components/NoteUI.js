import React from 'react';

const BLOCKTYPES = [
    { label: 'CODE', style: 'code-block' },
    { label: 'UL', style: 'unordered-list-item'},
    { label: 'OL', style: 'ordered-list-item'},
    { label: 'QUOTE', style: 'blockquote' }
];

const HEADERS = [
    { label: 'H1', style: 'header-two' },
    { label: 'H2', style: 'header-three' },
    { label: 'H3', style: 'header-four' },
];

const INLINETYPES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

const NoteUI = ({editorState, onBlockButtonClick, onInlineButtonClick}) => {

    const selection = editorState.getSelection();
    const currentTypeBlock =  editorState
                    .getCurrentContent()
                    .getBlockForKey(selection.getStartKey())
                    .getType();
 
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    return (
        <div className='editor-ui'>
            { HEADERS.map(header => {

                return (
                        <button 
                            key={header.label}
                            onClick={ e =>  { 
                                e.preventDefault(); onBlockButtonClick(header.style)}
                            }
                            className={
                                `btn--rich-text ${currentTypeBlock === header.style ? 'active' : ''}`
                            }
                        >
                            {header.label}
                        </button>
                )
            }) 
            }
            { INLINETYPES.map(type => {
                return (
                    <button 
                        key={type.label}
                        onClick={ e =>  { 
                            e.preventDefault(); onInlineButtonClick(type.style)}
                        }
                        className={
                            `btn--rich-text ${currentInlineStyle.has(type.style) ? 'active' : ''}`
                        }
                    >
                        {type.label}
                    </button>
                )
            }) 
            }
            { BLOCKTYPES.map(blocktype => {
                return (
                    <button 
                        key={blocktype.label}
                        onClick={ e =>  { 
                            e.preventDefault(); onBlockButtonClick(blocktype.style)}
                        }
                        className={
                            `btn--rich-text ${currentTypeBlock === blocktype.style ? 'active' : ''}`
                        }
                    >
                        {blocktype.label}
                    </button>
                )
            }) 
            }
        </div>
    )
};

export default NoteUI;