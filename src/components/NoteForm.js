import React from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import FormEditor from './FormEditor';
import { preProcessContent } from '../myTools/html-pre-processor';
import moment from 'moment';
import { connect } from 'react-redux';
import { addSubject } from '../actions/subjects';
import Header from './Header';
import { Link } from 'react-router-dom';

class NoteForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editorState: props.note ? EditorState.createWithContent(convertFromRaw(props.note.rawData)) : EditorState.createEmpty(),
            title: props.note ? props.note.title : '',
            error: undefined,
            subject: props.note ? props.note.subject : { value: 'no_subject', text: 'No Subject' },
            hasNewSubject: false,
            newSubject: ''
        };
    };

    onChange = (editorState) => {
        this.setState({
            editorState
        });
    };    

    onSubmit = (e) => {
        e.preventDefault();
        
        const currentContent = this.state.editorState.getCurrentContent();
        let error = undefined;
        
        // Handle form 
        if(currentContent.getPlainText().trim() === '' || this.state.title.trim() === ''){
            error = 'Note must contain title and content';
        } 
        else if(this.state.hasOtherSubject && this.state.newSubject.trim() === ''){
            error = 'Subject must contain at least 3 letters';
        }
        else if(!!this.props.subjects.find(subject => subject.text.toLowerCase() === this.state.newSubject.trim().toLowerCase())) {
            error = 'This subject already exists.';
        }
        else {
            error = undefined;

            // Parse subject object to appropriate format
            let newSubjectParsed = undefined;
            
            if(this.state.hasNewSubject) {
                newSubjectParsed = {
                    // Value to be read by select
                    value: this.state.newSubject.replace(' ', '_').replace('-', '_').toLowerCase(),
                    // Text displayed as typed by user
                    text: this.state.newSubject
                };

                this.props.addSubject(newSubjectParsed);
            };
            
            const rawData = convertToRaw(currentContent);

            // Process from raw data blocks to HTML string
            const contentArray = preProcessContent(rawData);
            
            this.props.onSubmit({
                title: this.state.title,
                textContent: currentContent.getPlainText().trim(),
                content: contentArray,
                dateCreated: moment().valueOf(),
                rawData,
                subject: this.state.hasNewSubject ? newSubjectParsed : this.state.subject
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
        this.setState({ subject: {value: selected.value, text: selected.text} });
        this.setState({hasNewSubject: selected.value === 'other'});
    };

    handleNewSubject = (e) => {
        const value = e.target.value;
        this.setState({ newSubject: value });
    };

    render () {
        return (
            <div className='wrapper-inner'>
                <Header 
                    left_side={
                        <Link to='/'>
                            Go back to dashboard
                        </Link>
                    }
                    right_side={
                        <div className='header-right__added'>
                            <button className='btn btn--icon'>
                                <i className="ionicons ion-arrow-expand"></i>
                            </button>
                            <button className='btn btn--icon'>
                                <i className="ionicons ion-trash-b"></i>
                            </button>
                            <button 
                                onClick={this.onSubmit}
                                className='btn btn--green'>
                                Save Note
                            </button>
                        </div>
                    }
                />
                <div className='content-container'>
                    <form onSubmit={this.onSubmit} className='form'>
                        { !!this.state.error && <h2>{this.state.error}</h2> }

                        <div className='input-group group__title-subject'>
                            <div className='input-group--note-form input-item__title'>
                                <input 
                                    className='input'
                                    type={'text'}
                                    value={this.state.title} 
                                    placeholder={'Note Title'}
                                    onChange={this.handleTitleOnChange}
                                />
                            </div>

                            <div className='input-group--note-form input-item__select'>
                                <select
                                    className='select'
                                    value={this.state.subject.value} 
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
                                <i className="ionicons ion-chevron-down"></i>
                            </div>

                        </div>
                        {
                            this.state.subject.value === 'other' &&
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
                        
                        
                        <FormEditor onChange={this.onChange} editorState={this.state.editorState}/>

                    </form>
                </div>
            </div>
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