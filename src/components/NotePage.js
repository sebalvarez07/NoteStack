import React from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import FormEditor from './FormEditor';
import moment from 'moment';
import { connect } from 'react-redux';
import NotePageHeader from './NotePageHeader';
import NoteUI from './NoteUI';
import { setEditorState } from '../actions/editorState';
import MultiDecorator from 'draft-js-multidecorators';
import PrismDraftDecorator from '../helpers/prismDecorator';

const decoratorJS = new PrismDraftDecorator(Prism.languages.javascript, 'codeBlockJS', 'javascript');
const decoratorPHP = new PrismDraftDecorator(Prism.languages.php, 'codeBlockPHP', 'php');
const decoratorCSS = new PrismDraftDecorator(Prism.languages.css, 'codeBlockCSS', 'css');
const decoratorHTML = new PrismDraftDecorator(Prism.languages.markup, 'codeBlockHTML', 'markup');

const decorator = new MultiDecorator([
    decoratorJS,
    decoratorPHP,
    decoratorCSS,
    decoratorHTML
]);

class NoteForm extends React.Component {

    constructor(props) {
        super(props);

        this.props.setEditorState(this.props.note.rawData !== '' ? EditorState.createWithContent(convertFromRaw(this.props.note.rawData), decorator) : EditorState.createEmpty(), decorator);

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

        try{
            this.setState({
                editorState: EditorState.set(editorState, { decorator })
            });    
        }
        catch(error){
            if(error.name === 'TypeError' && error.message.indexOf('getImmutable') !== -1){
                // console.log('Immutable Error');
            }
        }
        
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
            
            <React.Fragment>
                <NotePageHeader 
                    noteID={this.props.note.id}
                    title={this.state.title} 
                    handleTitleOnChange={this.handleTitleOnChange} 
                    subjectValue={this.state.subject}
                    handleOnChangeSubject={this.handleOnChangeSubject}
                    handleNewSubject={this.handleNewSubject}
                    newSubject={this.state.newSubject}
                    editorUI={
                        <NoteUI
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                        />
                    }
                />
                <div className='editor-wrapper'>
                    <div className='content-container content-container--editor'>
                        
                        <FormEditor editorRef={this.editorRef} onChange={this.onChange} editorState={this.state.editorState}/>
                    </div>
                </div>
            </React.Fragment>
            
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