import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import RichBlockButtons from './RichBlockButtons';
import RichInlineButtons from './RichInlineButtons';
import { preProcessContent } from '../myTools/html-pre-processor';
import moment from 'moment';
import { connect } from 'react-redux';
import { addSubject } from '../actions/subjects';

class NoteForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editorState: props.note ? EditorState.createWithContent(convertFromRaw(props.note.rawData)) : EditorState.createEmpty(),
            title: props.note ? props.note.title : '',
            error: undefined,
            subject: props.note ? props.note.subject : 'no_subject',
            hasOtherSubject: false,
            newSubject: ''
        };
    };

    onChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
    };

    _onBlockButtonClick = (blockType) => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };

    _onInlineButtonClick = (inlineType) => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineType));
    };

    onSubmit = (e) => {
        e.preventDefault();
        
        const currentContent = this.state.editorState.getCurrentContent();
        let error = undefined;
        
        // Handle form 
        if(currentContent.getPlainText().trim() === '' || this.state.title.trim() === ''){
            error = 'Note must contain title and content'
        } 
        else if(this.state.hasOtherSubject && this.state.newSubject.trim() === ''){
            error = 'Subject already exists'
        }
        else if(!!this.props.subjects.find(subject => subject.text.toLowerCase() === this.state.newSubject.trim().toLowerCase())) {
            
            error = 'This subject already exists.';
        }
        else {
            this.setState({ error: undefined });

            if(this.state.hasOtherSubject) 
                this.props.addSubject( this.state.newSubject );
            
            // Process from raw data blocks to HTML string
            const contentArray = preProcessContent(convertToRaw(currentContent));
            
            this.props.onSubmit({
                title: this.state.title,
                textContent: currentContent.getPlainText().trim(),
                content: contentArray,
                dateCreated: moment().valueOf(),
                rawData: convertToRaw(currentContent),
                subject: this.state.hasOtherSubject ? this.state.newSubject.replace(' ', '_').toLowerCase() : this.state.subject
            });
        }

        this.setState({
            error
        });
    };

    handleTitleOnChange = (e) => {
        const title = e.target.value;
        this.setState({
            title
        });
    };

    handleOnChangeSubject = (e) => {

        const selected = e.target.options[e.target.selectedIndex];

        this.setState({ subject: selected.value });

        if(selected.value === 'other'){
            this.setState({hasOtherSubject: true});
        } else {
            this.setState({hasOtherSubject: false});
        }
    };

    handleNewSubject = (e) => {
        const value = e.target.value;
        this.setState({ newSubject: value });
    };

    render () {
        return (
            <form onSubmit={this.onSubmit} className='form'>

                { !!this.state.error && <h2>{this.state.error}</h2> }

                <div className='input-group'>
                    <div className='input-group__item'>
                        <input 
                            type={'text'}
                            value={this.state.title} 
                            placeholder={'Note title'}
                            onChange={this.handleTitleOnChange}
                        />
                    </div>
                </div>

                <div className='wysiwyg-styler'>
                    <RichBlockButtons 
                        editorState={this.state.editorState}
                        onBlockButtonClick={this._onBlockButtonClick}
                    />

                    <RichInlineButtons 
                        editorState={this.state.editorState}
                        onInlineButtonClick={this._onInlineButtonClick}
                    />
                
                    <Editor 
                        editorState={this.state.editorState} 
                        onChange={this.onChange} 
                        handleKeyCommand={this.handleKeyCommand}
                    />
                </div>
                <div className='input-group'>
                    <div className='input-group__item'>
                        <select 
                            placeholder='Subject'
                            value={this.state.subject} 
                            onChange={this.handleOnChangeSubject}
                            >
                            <option value='no_subject'>No Subject</option>
                            {
                                this.props.subjects.map(subject => (
                                    <option key={subject.value} value={subject.value}>{subject.text}</option>)
                                )
                            }
                            <option value='other'>Other</option>
                        </select>            
                    </div>

                    {this.state.subject === 'other' &&
                        <div className='input-group__item'>   
                            <input 
                                type='text' 
                                value={this.state.newSubject} 
                                onChange={this.handleNewSubject}/>
                        </div>
                    }
                </div>
                <div>
                    <button type='submit' className='btn btn--blue'>Submit</button>
                </div>
            </form>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    addSubject: (subject) => dispatch(addSubject(subject))
});

const mapStateToProps = (state) => ({
    subjects: state.subjects
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);