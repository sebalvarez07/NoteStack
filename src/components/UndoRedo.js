import React from 'react';
import { EditorState } from 'draft-js';

const UndoRedo = ({editorState, onChange}) => {

    const handleUndo = () => {
        onChange(EditorState.undo(editorState));
    }

    const handleRedo = () => {
        onChange(EditorState.redo(editorState));
    }

    return (
        <React.Fragment>
            <span
                onMouseDown={handleUndo}
                className='note-ui__item undo-redo'    
            >
                <img src='/images/UI-icons/undo.svg' className='block-UI__icon-svg'/>
            </span>
            <span
                onMouseDown={handleRedo}
                className='note-ui__item undo-redo'    
            >
                <img src='/images/UI-icons/redo.svg' className='block-UI__icon-svg'/>
            </span>
        </React.Fragment>
    )
};

export default UndoRedo;