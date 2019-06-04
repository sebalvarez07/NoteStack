import React, { useState } from 'react';
import { setText, setToLatest, setToEarliest, setSubject } from '../actions/filters';
import { connect } from 'react-redux';
import getSubject from '../selectors/subjects';

const NotesFilters = (props) => {

    const [textSearch, setTextSearch] = useState(props.filters.text);
    const [isLatest, setIsLatest] = useState(true);

    const handleOnChangeText = (e) => {
        const val = e.target.value;
        setTextSearch(val);
        props.setText(val);
    };

    const handleOnChangeSortBy = (e) => {

        const isLatestUpdated = !isLatest;

        setIsLatest(isLatestUpdated);

        if(!isLatestUpdated)
            props.setToEarliest();
        else if(isLatestUpdated)
            props.setToLatest();
    };

    const handleOnChangeSubject = (e) => {
        const value = e.target.options[e.target.selectedIndex].value;
        props.setSubject(value);
    };
 
    return (
        <div className='search-ui'>
            <div className='input-search__text'>
                <input 
                    id='search-input'
                    className='input-text' 
                    type='text' value={textSearch} 
                    onChange={handleOnChangeText} 
                    placeholder='Search Notes'
                />
                <label htmlFor='search-input' className='search-input__label'>
                    <i className="ionicons ion-android-search"></i>
                </label>
            </div>
            <div className='flexer space-between'>
                <div className='input-search__filter input-search__filter--select'>
                    <select 
                        className='input-select' 
                        value={props.filters.subject} 
                        onChange={handleOnChangeSubject}
                        >
                            <option value='all_subjects'>All Subjects</option>
                            {
                                props.subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)                                       
                            }
                    </select>
                    <i class="ionicons ion-chevron-down"></i>
                </div>
                <div className='input-search__filter'>
                    <button 
                        className='btn-filter'
                        onClick={handleOnChangeSortBy}
                        > 
                            { isLatest ? 'Latest' : 'Earliest' } 
                    </button>
                </div>
            </div>
            
        </div>
    );
};

const mapStateToProps = (state) => ({
    filters: state.filters,
    subjects: getSubject(state.notes)
})

const mapDispatchToProps = (dispatch) => ({
    setText: (text) => dispatch(setText(text)),
    setToLatest: () => dispatch(setToLatest()),
    setToEarliest: () => dispatch(setToEarliest()),
    setSubject: (subject) => dispatch(setSubject(subject))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesFilters);