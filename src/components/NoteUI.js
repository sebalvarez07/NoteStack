import React from 'react';
import { RichUtils, Modifier, EditorState } from 'draft-js';
import { BLOCKTYPES, FONTTYPES, INLINETYPES, colorStyleMap  } from '../helpers/editorStyleMaps';

const NoteUI = ({editorState, onChange}) => {

    const selection = editorState.getSelection();

    const currentTypeBlock = editorState
                    .getCurrentContent()
                    .getBlockForKey(selection.getStartKey())
                    .getType();
 
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    const isFontType = !!FONTTYPES.map(ft => ft.style).find(ft => ft === currentTypeBlock);

    const toggleBlockUI = (blockType) => {
        onChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    const _onInlineButtonClick = (inlineType) => {

        onChange(RichUtils.toggleInlineStyle(editorState, inlineType));
    };

    const toggleColor = (toColor) => {
        
        const selection = editorState.getSelection();

        // Remove all color styles already applied

        // Get array of inline style names from style map object
        const colourMap = Object.keys(colorStyleMap);
        // Remove color inline styles on selection recursively
        const nextContentState = colourMap.reduce((contentState, color) => {
            // Modifier returns a ContentState object
            return Modifier.removeInlineStyle(contentState, selection, color);
        }, editorState.getCurrentContent());

        // Set up next state object using EditorState.push()
        let nextEditorState = EditorState.push( editorState, nextContentState, 'change-inline-style');

        // This array that comes back is Immutable, so no matter what we do to nextEditorState and nextContentState
        // this array will be true to whatever is being rendered BEFORE processing the colorToggle()
        const curInlineStyle = editorState.getCurrentInlineStyle();

        // Check if selection is collapsed (or caret is active and blinking on text editor - meaning no selection is made)
        if(selection.isCollapsed()){
            // This works because a collapsed selection in this case means that only one spot is 'selected'. So if we
            // take all of the inlinestyles using currentInlineStlye() we can toggle them off without overlap risk
            nextEditorState = curInlineStyle.reduce((state, color) => {
                // RichUtils returns an Editor State object
                 return RichUtils.toggleInlineStyle(state, color);
            }, nextEditorState );
        };

        // We prevent from applying the initial colour again so that toggling occurs
        if(!curInlineStyle.has(toColor)){
            nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toColor);
        }

        onChange(nextEditorState);
    };

    return (
        <div className='editor-ui'>
              
            <select 
                value={ isFontType ? currentTypeBlock : 'no_value'} 
                onChange={e => toggleBlockUI(e.target.value)}>
                { 
                    FONTTYPES.map(fontType => 
                        <option key={fontType.label} value={fontType.style}>{fontType.label}</option>
                    )
                }
                {
                    !isFontType && <option value={'no_value'}>{'--'}</option>
                }
                
            </select>

            <button onClick={e => { e.preventDefault(); toggleColor('RED') }}> red</button>
            <button onClick={e => { e.preventDefault(); toggleColor('BLUE') }}> blue</button>
            <button onClick={e => { e.preventDefault(); toggleColor('GREEN') }}> green</button>
            <button onClick={e => { e.preventDefault(); toggleColor('YELLOW') }}> yellow</button>

            { INLINETYPES.map(type => {
                return (
                    <button 
                        key={type.label}
                        onClick={ e =>  { 
                            e.preventDefault(); _onInlineButtonClick(type.style)}
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
                            e.preventDefault(); toggleBlockUI(blocktype.style)}
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