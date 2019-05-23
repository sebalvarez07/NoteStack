import React from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import FormEditor from './FormEditor';
import moment from 'moment';
import { connect } from 'react-redux';
import NotePageHeader from './NotePageHeader';
import NoteUI from './NoteUI';
import { setEditorState } from '../actions/editorState';

class NoteForm extends React.Component {

    constructor(props) {
        super(props);

        this.props.setEditorState(this.props.note.rawData !== '' ? EditorState.createWithContent(convertFromRaw(this.props.note.rawData)) : EditorState.createEmpty());

        this.state = {
            editorState: this.props.note.rawData !== '' ? EditorState.createWithContent(convertFromRaw(this.props.note.rawData)) : EditorState.createEmpty(),
            title: this.props.note.title || '',
            subject: this.props.note.subject,
            hasNewSubject: false,
            newSubject: ''
        };

        if(props.note) {
            this.onLoadEditorState = this.state.editorState;
            this.prevTitle = this.state.title;
            this.prevSubject = this.state.subject;
        }

        this.readyToSave = true;
        this.componentUnmounted = false;
        this.editorRef = React.createRef();
        this.focus = (e) => {this.editorRef.current.focus()}
    };

    saveNote = () => {
        const editorUpdated = this.onLoadEditorState !== this.state.editorState;
        const titleUpdated = this.prevTitle !== this.state.title;
        const subjectUpdated = this.prevSubject !== this.state.subject;

        if(editorUpdated || titleUpdated || subjectUpdated) {
            this.onSubmit();
        }
    };

    componentWillUnmount() {
        this.componentUnmounted = true;
        this.saveNote();
    };

    componentDidUpdate() {
        if(this.readyToSave) {
            this.readyToSave = false;
            this.saveNote();

            setTimeout(() => {
                if(!this.componentUnmounted) {
                    this.readyToSave = true;
                }
            }, 100);
        }
    };

    onChange = (editorState) => {

        this.props.setEditorState({
            ...this.props.editorState,
            ...editorState
        });

        this.setState({
            editorState: editorState
        });
    };    

    onSubmit = () => {
        
        const currentContent = this.state.editorState.getCurrentContent();
        
        let newSubject = '';
        if(this.state.hasNewSubject) {
            const subjectFound = this.props.subjects.find(subject => subject.toLowerCase() === this.state.newSubject.trim().toLowerCase())
            newSubject = !!subjectFound? subjectFound :  this.state.newSubject.trim()
        };
        
        const rawData = convertToRaw(currentContent);
        
        this.props.onSubmit({
            title: this.state.title,
            textContent: currentContent.getPlainText().trim(),
            dateCreated: moment().valueOf(),
            rawData,
            subject: this.state.hasNewSubject ? newSubject : this.state.subject
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
        this.setState({ hasNewSubject: selected.value === 'other' });
    };

    handleNewSubject = (e) => {
        const value = e.target.value;
        this.setState({ newSubject: value });
    };

    render () {
        return (
            <div className='note-page'>
                <form onSubmit={this.onSubmit} className={`from ${this.props.noteStatus ? 'has-saved': 'not-saved'}`}>
                    <NotePageHeader 
                        noteID={this.props.note.id}
                        title={this.state.title} 
                        handleTitleOnChange={this.handleTitleOnChange} 
                        subjectValue={this.state.subject}
                        handleOnChangeSubject={this.handleOnChangeSubject}
                        editorUI={
                            <NoteUI
                                editorState={this.state.editorState}
                                onChange={this.onChange}
                            />
                        }
                    />
                    <div className='editor-wrapper'>
                        <div className='content-container'>
                            
                            {
                                this.state.subject === 'other' &&
                                <div className='input-item__other'>
                                    <input
                                        placeholder='Enter New Subject'
                                        className='input'
                                        type='text'
                                        value={this.state.newSubject}
                                        onChange={this.handleNewSubject}
                                    />
                                </div>
                            }
                            
                            <FormEditor editorRef={this.editorRef} onChange={this.onChange} editorState={this.state.editorState}/>
                        </div>
                    </div>
                </form>
            </div>   
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    addSubject: (subject) => dispatch(addSubject(subject)),
    setEditorState: (editorState) => dispatch(setEditorState(editorState))
});

const mapStateToProps = (state) => ({
    subjects: state.notes.map(note => note.subject),
    editorState: state.editorState
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);