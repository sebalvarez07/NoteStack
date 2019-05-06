import React from 'react';
import RichBlockButtons from './RichBlockButtons';
import RichInlineButtons from './RichInlineButtons';
import { Editor, RichUtils } from 'draft-js';

const FormEditor = (props) => {

    const _onBlockButtonClick = (blockType) => {
        props.onChange(RichUtils.toggleBlockType(props.editorState, blockType));
    };

    const _onInlineButtonClick = (inlineType) => {
        props.onChange(RichUtils.toggleInlineStyle(props.editorState, inlineType));
    };

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          props.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
    };

    return (
        <div className='wysiwyg-editor'>

            <div className='editor-ui'>
                <RichBlockButtons  
                    editorState={props.editorState}
                    onBlockButtonClick={_onBlockButtonClick}
                />

                <RichInlineButtons 
                    editorState={props.editorState}
                    onInlineButtonClick={_onInlineButtonClick}
                />
            </div>
            
            <Editor 
                editorState={props.editorState} 
                onChange={props.onChange} 
                handleKeyCommand={handleKeyCommand}
            />
        </div>
    )
}

export default FormEditor;