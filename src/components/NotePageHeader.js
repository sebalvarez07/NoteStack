import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import HeaderCollapseButton from './HeaderCollapseButton';
import SidebarCollapseButton from './SidebarCollapseButton';
import RemoveNoteButton from './RemoveNoteButton';
import getSubject from '../selectors/subjects';
import FavouriteNoteButton from './FavouriteNoteButton';

const NotePageHeader = (props) => {

    return (
        <div className={`header-wrapper`}>
            <Header 
                left_side={
                    <div className='note-form-group__header'>
                        <div className='note-form-item note-form__title'>
                            <input 
                                id='note-title' 
                                className='input' 
                                value={props.title} 
                                onChange={props.handleTitleOnChange}
                                placeholder={'Title Undefined'}
                            />
                        </div>
                        <div className='note-form-group__subject'>
                            <div className='note-form-item note-form__subject'>
                                <label htmlFor='subject-select' className='note-form__label'>Subject: </label>
                                <select
                                    id='subject-select'
                                    className='select'
                                    value={props.subjectValue} 
                                    onChange={props.handleOnChangeSubject}
                                >
                                    <option value=''>No Subject</option>
                                    {
                                        props.subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)                                                                               
                                    }
                                    <option value='other'>Other</option>
                                </select>
                                { /* <i className="ionicons ion-chevron-down"></i> */ }
                            </div>
                            {
                                props.subjectValue === 'other' &&
                                <div className='note-form-item note-form__subject'>
                                    <label htmlFor='new-subject__input' className='note-form__label'>New Subject: </label>
                                    <input
                                        id='new-subject__input'
                                        placeholder='Enter New Subject'
                                        className='input'
                                        type='text'
                                        value={props.newSubject}
                                        onChange={props.handleNewSubject}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                }
            /> 
            <div className='note-ui'>
                <div className='sidebar-collapser sidebar-collapse--sm'>
                    <SidebarCollapseButton />
                </div>

                <div className='content-container'>
                    <div className='header__content-layout note-ui__content flexer space-between align-center'>
                        <div className='header__left-side'>
                            { props.editorUI }
                        </div>
                        
                        <div className='header__right-side'>
                            <span className={`h-border-sides h-w40`}>
                                <FavouriteNoteButton noteID={props.noteID} />
                            </span>
                            <span className={`h-border-sides h-w40`}>
                                <RemoveNoteButton noteID={props.noteID}/>
                            </span>
                            
                            <HeaderCollapseButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    subjects: getSubject(state.notes)
});

export default connect(mapStateToProps)(NotePageHeader);