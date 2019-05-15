import React from 'react';
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js';
import CodeUtils from 'draft-js-code';

const FormEditor = (props) => {

    const handleKeyCommand = (command, editorState) => {
        let newState;

        // if (CodeUtils.hasSelectionInBlock(editorState)) {
        // newState = CodeUtils.handleKeyCommand(editorState, command);
        // }

        // if (!newState) {
        newState = RichUtils.handleKeyCommand(editorState, command);
        // }

        if (newState) {
            props.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const keyBindingFn = (evt) => {
        
        if (!CodeUtils.hasSelectionInBlock(props.editorState)) return getDefaultKeyBinding(evt);

        const command = CodeUtils.getKeyBinding(evt);

        return command || getDefaultKeyBinding(evt);
    }

    const handleReturn = (evt) => {
        
        if (!CodeUtils.hasSelectionInBlock(props.editorState)) return 'not-handled';

        props.onChange(CodeUtils.handleReturn(evt, props.editorState));
        return 'handled';
    }

    const onTab = (evt) => {
        if (!CodeUtils.hasSelectionInBlock(props.editorState)) return 'not-handled';

        props.onChange(CodeUtils.onTab(evt, props.editorState));
        return 'handled';
    }

    return (
        <div className='wysiwyg-editor'>
            
            <Editor 
                editorState={props.editorState} 
                onChange={props.onChange} 
                handleKeyCommand={handleKeyCommand}
                // keyBindingFn={keyBindingFn}
                // handleKeyCommand={handleKeyCommand}
                // handleReturn={handleReturn}
                // onTab={onTab}
            />
        </div>
    )
}

export default FormEditor;