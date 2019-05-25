import React from 'react';
import { RichUtils, Modifier, EditorState } from 'draft-js';
import { colorStyleMap, HighlighterStyleMap  } from '../helpers/editorStyleMaps';
import ToggleColorButton from './ToggleColorButton';

const ToggleColorsUI = ({editorState, onChange }) => {

    const toggleColor = (toColor, styleMap) => {
        
        const selection = editorState.getSelection();
        
        // Remove all color styles already applied

        // Get array of inline style names from style map object
        const colourMap = Object.keys(styleMap);
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
        nextEditorState = EditorState.forceSelection(nextEditorState, selection);

        // Check if selection is collapsed (or caret is active and blinking on text editor - meaning no selection is made)
        if(selection.isCollapsed()){
            // This works because a collapsed selection in this case means that only one spot is 'selected'. So if we
            // take all of the inlinestyles using currentInlineStlye() we can toggle them off without overlap risk
            nextEditorState = curInlineStyle.reduce((state, color) => {
                // RichUtils returns an Editor State object
                if(colourMap.find(colorM => colorM === color)) {
                    return RichUtils.toggleInlineStyle(state, color);
                }
                return state;
            }, nextEditorState );
        };

        // We prevent from applying the initial colour again so that toggling occurs
        if(!curInlineStyle.has(toColor)){
            nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toColor);
        }

        onChange(nextEditorState);
    };

    const currentInlineStyle = editorState.getCurrentInlineStyle();

    const handleToggleColor = (e, color, styleMap) => {
        e.preventDefault();
        toggleColor(color, styleMap);
    }

    return (
        <React.Fragment>
            <ToggleColorButton 
                className={'color__icon--text'} 
                StyleMap={colorStyleMap}    
                currentInlineStyle={currentInlineStyle}
                handleToggleColor={handleToggleColor}
            />

            <ToggleColorButton 
                className={'color__icon--highlight'}                 
                StyleMap={HighlighterStyleMap}    
                currentInlineStyle={currentInlineStyle}
                handleToggleColor={handleToggleColor}
            />
        </React.Fragment>
    )
}

export default ToggleColorsUI;