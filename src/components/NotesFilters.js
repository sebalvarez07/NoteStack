import React, { useState } from 'react';
import { setText, setToLatest, setToEarliest, setSubject } from '../actions/filters';
import { connect } from 'react-redux';

const NotesFilters = (props) => {

    const [textSearch, setTextSearch] = useState('');

    const handleOnChangeText = (e) => {
        const val = e.target.value;
        setTextSearch(val);
        props.setText(val);
    };

    const handleOnChangeSortBy = (e) => {
        const val = e.target.value;
        if(val === 'earliest')
            props.setToEarliest();
        else if(val === 'latest')
            props.setToLatest();
    };

    const handleOnChangeSubject = (e) => {
        const value = e.target.options[e.target.selectedIndex].value;
        props.setSubject(value);
    };

    return (
        <div className='input-group'>
            <div className='input-group__item'>
                <input type='text' value={textSearch} onChange={handleOnChangeText}/>
            </div>
            <div className='input-group__item'>
                <select value={props.filters.sortBy} onChange={handleOnChangeSortBy}>
                    <option value='latest'>Latest</option>
                    <option value='earliest'>Earliest</option>
                </select>
            </div>
            <div className='input-group__item'>
                <select value={props.filters.subject} onChange={handleOnChangeSubject}>
                    <option value='all_subjects'>All Subjects</option>
                    {
                        props.subjects.map(subject => (
                            <option key={subject.value} value={subject.value}>{subject.text}</option>)
                        )
                    }
                </select>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    filters: state.filters,
    subjects: state.subjects
})

const mapDispatchToProps = (dispatch) => ({
    setText: (text) => dispatch(setText(text)),
    setToLatest: () => dispatch(setToLatest()),
    setToEarliest: () => dispatch(setToEarliest()),
    setSubject: (subject) => dispatch(setSubject(subject))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesFilters);