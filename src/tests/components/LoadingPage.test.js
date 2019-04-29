import { shallow } from 'enzyme';
import React from 'react';
import LoadingPage from '../../components/LoadingPage.js';

test('Should render loader component', () => {
    const wrapper = shallow(<LoadingPage />);

    expect(wrapper).toMatchSnapshot();
});