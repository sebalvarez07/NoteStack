import filtersReducer from '../../reducers/filters';
import { defaultFilters, defaultFiltersAlt } from '../fixtures/filters';

test('Test default filter state', () =>{
    const state = filtersReducer(defaultFilters, {type: '@@INIT'});
    expect(state).toEqual(defaultFilters);
});

test('Set text on filter', () =>{

    const text = 'New Text';
    const action = {
        type: 'SET_TEXT',
        text
    };

    const state = filtersReducer(defaultFilters, action);
    expect(state).toEqual({
        ...defaultFilters,
        text
    });
});

test('Set sortBy filter to earliest', () =>{

    const action = {
        type: 'SET_EARLIEST',
    };

    const state = filtersReducer(defaultFilters, action);
    expect(state.sortBy).toBe('earliest');
});

test('Set sortBy filter to Latest', () =>{

    const action = {
        type: 'SET_LATEST',
    };

    const state = filtersReducer(defaultFiltersAlt, action);
    expect(state.sortBy).toBe('latest');
});

test('Set subject on filter', () =>{

    const subject = 'Vue';
    const action = {
        type: 'SET_SUBJECT',
        subject
    };

    const state = filtersReducer(defaultFilters, action);
    expect(state.subject).toBe(subject);
});