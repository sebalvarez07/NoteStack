import { Header } from '../../components/Header';
import React from 'react';
import { shallow } from 'enzyme';

test('Should render Header correctly', () => {

    const wrapper = shallow(<Header startLoginOut={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
});

test('Should called staratLoginOut on button click', () => {

    const startLoginOut = jest.fn();
    const wrapper = shallow(<Header startLoginOut={startLoginOut}/>);

    wrapper.find('button').simulate('click');
    expect(startLoginOut).toHaveBeenCalled();
});