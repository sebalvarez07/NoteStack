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

        let newState;

        if (CodeUtils.hasSelectionInBlock(editorState)) {
        newState = CodeUtils.handleKeyCommand(editorState, command);
        }

        if (!newState) {
        newState = RichUtils.handleKeyCommand(editorState, command);
        }

        if (newState) {
        this.props.onChange(newState);
        return 'handled';
        }
        return 'not-handled';
    };

    keyBindingFn = (evt) => {
        const editorState = this.props.editorState;
        // if (!CodeUtils.hasSelectionInBlock(editorState)) return Draft.getDefaultKeyBinding(evt);

        const command = CodeUtils.getKeyBinding(evt);

        return command || Draft.getDefaultKeyBinding(evt);
    }

    handleReturn = (evt) => {
        const editorState = this.props.editorState;
        // if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

        if(evt.shiftKey || evt.ctrlKey || evt.altKey){
            this.props.onChange(CodeUtils.handleReturn(evt, editorState));
            return 'handled';
        }
    }

    onTab = (evt) => {
        const editorState = this.props.editorState;
        // if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

        let newState;
        if (evt.shiftKey) {
            // since backspace removes tabs in CodeUtils 
            // https://github.com/SamyPesse/draft-js-code/blob/9783c0f6bbedda6b7089712f9c657a72fdae636d/lib/handleKeyCommand.js#L11
            evt.preventDefault();
            newState = CodeUtils.handleKeyCommand(editorState, 'backspace');
        } else {
            // let CodeUtils insert tabs
            newState = CodeUtils.onTab(evt, editorState);
        }
        this.props.onChange(newState);
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
                    handleReturn={this.handleReturn}
                    keyBindingFn={this.keyBindingFn}
                    editorState={this.props.editorState} 
                    onChange={this.props.onChange} 
                    customStyleMap={{...colorStyleMap, ...HighlighterStyleMap}}
                    keyBindingFn={this.keyBindingFn}
                    handleKeyCommand={this.handleKeyCommand}
                    onTab={this.onTab}
                    blockRenderMap={extendedBlockRenderMap}
                    ref={(ref) => this.editorRef = ref }
                    handlePastedText={this.handlePastedText}
                />
            </div>
        )
    }
}

export default FormEditor;