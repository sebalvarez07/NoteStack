import React from 'react';
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js';
import { colorStyleMap } from '../helpers/editorStyleMaps';

const FormEditor = (props) => {

    const handleKeyCommand = (command, editorState) => {
        let newState;

        newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            props.onChange(newState);
            return 'handled'; 
        }
        return 'not-handled';
    };

    return (
        <div className='wysiwyg-editor'>
            
            <Editor 
                editorState={props.editorState} 
                onChange={props.onChange} 
                handleKeyCommand={handleKeyCommand}
                customStyleMap={colorStyleMap}
            />
        </div>
    )
}

export default FormEditor;