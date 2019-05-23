import React from 'react';
import { RichUtils, EditorState } from 'draft-js';
import { BLOCKTYPES  } from '../helpers/editorStyleMaps';
import ToggleColorsUI from './ToggleColorsUI';
import ToggleFontStyles from './ToggleFontStyle';
import ToggleFontTypes from './ToggleFontType';

const NoteUI = ({editorState, onChange }) => {

    const selection = editorState.getSelection();

    const currentTypeBlock = editorState
                    .getCurrentContent()
                    .getBlockForKey(selection.getStartKey())
                    .getType();
 
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    const toggleBlockUI = (blockToggled) => {
        const curSelection = editorState.getSelection();
        const nextEditorState = EditorState.forceSelection(editorState, curSelection);
        onChange(RichUtils.toggleBlockType(nextEditorState, blockToggled));
    };  

    return (
        <div className='editor-ui'>
            
            <ToggleFontTypes currentTypeBlock={currentTypeBlock} toggleBlockUI={toggleBlockUI} />
            <ToggleColorsUI onChange={onChange} editorState={editorState}/>
            <ToggleFontStyles onChange={onChange} editorState={editorState} currentInlineStyle={currentInlineStyle} />
            
            { BLOCKTYPES.map(blocktype => {
                return (
                    <span 
                        key={blocktype.label}
                        onMouseDown={ e =>  { 
                            e.preventDefault(); 
                            toggleBlockUI(blocktype.style)}
                        }
                        className={
                            `btn--rich-text ${currentTypeBlock === blocktype.style ? 'active' : ''}`
                        }
                    >
                        {blocktype.label}
                    </span>
                )
            }) 
            }
        </div>
    )
};

export default NoteUI;