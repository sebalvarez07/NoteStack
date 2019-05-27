import React from 'react';
import { RichUtils, EditorState } from 'draft-js';
import { BLOCKTYPES  } from '../helpers/editorStyleMaps';
import ToggleColorsUI from './ToggleColorsUI';
import ToggleFontStyles from './ToggleFontStyle';
import ToggleFontTypes from './ToggleFontType';
import ToggleCodeHighlighters from './ToggleCodeHighlighters';
import BlockIconUI from './BlockIconUI';

const NoteUI = ({editorState, onChange }) => {

    const selection = editorState.getSelection();

    const currentTypeBlock = editorState
                    .getCurrentContent()
                    .getBlockForKey(selection.getStartKey())
                    .getType();

    const toggleBlockUI = (e, blockToggled) => {
        e.preventDefault();
        const curSelection = editorState.getSelection();
        const nextEditorState = EditorState.forceSelection(editorState, curSelection);
        onChange(RichUtils.toggleBlockType(nextEditorState, blockToggled));
    };  

    return (
        <div className='editor-ui'>
            
            <ToggleFontTypes currentTypeBlock={currentTypeBlock} toggleBlockUI={toggleBlockUI} />
            <ToggleColorsUI onChange={onChange} editorState={editorState}/>
            <ToggleFontStyles onChange={onChange} editorState={editorState} />
            <ToggleCodeHighlighters currentTypeBlock={currentTypeBlock} toggleBlockUI={toggleBlockUI } />

            { BLOCKTYPES.map(blocktype => {
                return (
                    <BlockIconUI 
                        key={blocktype.label} 
                        toggleBlockUI={toggleBlockUI} 
                        nameClass={`note-ui__item ${currentTypeBlock === blocktype.style ? 'active' : ''}`}
                        iconImg={blocktype.label}
                        blockStyle={blocktype.style}
                    />
                )
            }) 
            }
        </div>
    )
};

export default NoteUI;