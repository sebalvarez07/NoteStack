import React from 'react';
import Draft, { Editor, RichUtils } from 'draft-js';
import { colorStyleMap, HighlighterStyleMap } from '../helpers/editorStyleMaps';
import CodeUtils from 'draft-js-code';
import extendedBlockRenderMap from './CustomCodeBlocks';
import { registerCopySource, handleDraftEditorPastedText} from "draftjs-conductor";

class FormEditor extends React.Component {

    componentDidMount() {
        this.copySource = registerCopySource(this.editorRef);
    }

    componentWillUnmount() {
        if (this.copySource) {
          this.copySource.unregister();
        }
      }

    handleKeyCommand = (command) => {
        
        const editorState = this.props.editorState;

        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.props.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    keyBindingFn = (evt) => {
        const editorState = this.props.editorState;
        if (!CodeUtils.hasSelectionInBlock(editorState)) return Draft.getDefaultKeyBinding(evt);

        const command = CodeUtils.getKeyBinding(evt);

        return command || Draft.getDefaultKeyBinding(evt);
    }

    handleReturn = (evt) => {
        const editorState = this.props.editorState;
        if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

        this.props.onChange(CodeUtils.handleReturn(evt, editorState));
        return 'handled';
    }

    onTab = (evt) => {
        const editorState = this.props.editorState;
        if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

        this.props.onChange(CodeUtils.onTab(evt, editorState));
        return 'handled';
    }   

    handlePastedText = (text, html) => {
        let newState = handleDraftEditorPastedText(html, this.props.editorState);

        if (newState) {
            this.props.onChange(newState);
            return true;
        }

        return false;
    }
    render() {
        return (
            <div className='wysiwyg-editor'>
                
                <Editor 
                    editorState={this.props.editorState} 
                    onChange={this.props.onChange} 
                    customStyleMap={{...colorStyleMap, ...HighlighterStyleMap}}
                    keyBindingFn={this.keyBindingFn}
                    handleKeyCommand={this.handleKeyCommand}
                    blockRenderMap={extendedBlockRenderMap}
                    ref={(ref) => this.editorRef = ref }
                    handlePastedText={this.handlePastedText}
                />
            </div>
        )
    }
}

export default FormEditor;