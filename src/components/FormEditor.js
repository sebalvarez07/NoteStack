import React from 'react';
import Draft, { Editor, RichUtils } from 'draft-js';
import { colorStyleMap, HighlighterStyleMap } from '../helpers/editorStyleMaps';
import CodeUtils from 'draft-js-code';
import extendedBlockRenderMap from './CustomCodeBlocks';

const FormEditor = (props) => {

    const handleKeyCommand = (command) => {
        
        let newState;
        const editorState = props.editorState;

        if (CodeUtils.hasSelectionInBlock(editorState)) {
            newState = CodeUtils.handleKeyCommand(editorState, command);
        }

        if (!newState) {
            newState = RichUtils.handleKeyCommand(editorState, command);
        }

        if (newState) {
            props.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const keyBindingFn = (evt) => {
        const editorState = props.editorState;
        if (!CodeUtils.hasSelectionInBlock(editorState)) return Draft.getDefaultKeyBinding(evt);

        const command = CodeUtils.getKeyBinding(evt);

        return command || Draft.getDefaultKeyBinding(evt);
    }

    const handleReturn = (evt) => {
        const editorState = props.editorState;
        if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

        props.onChange(CodeUtils.handleReturn(evt, editorState));
        return 'handled';
    }

    const onTab = (evt) => {
        const editorState = props.editorState;
        if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

        props.onChange(CodeUtils.onTab(evt, editorState));
        return 'handled';
    }   

    return (
        <div className='wysiwyg-editor'>
            
            <Editor 
                editorState={props.editorState} 
                onChange={props.onChange} 
                handleKeyCommand={handleKeyCommand}
                customStyleMap={{...colorStyleMap, ...HighlighterStyleMap}}
                keyBindingFn={keyBindingFn}
                handleKeyCommand={handleKeyCommand}
                handleReturn={handleReturn}
                onTab={onTab}
                blockRendererFn={extendedBlockRenderMap}
            />
        </div>
    )
}

export default FormEditor;