import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('Should render login page', () => {

    const wrapper = shallow(<LoginPage startLoginIn={() => {}}/>);
    expect(wrapper).toMatchSnapshot();

});

test('Should call staratLoginIn on button click', () => {

    const startLoginIn = jest.fn();
    const wrapper = shallow(<LoginPage startLoginIn={startLoginIn}/>);

    wrapper.find('button').simulate('click');
    expect(startLoginIn).toHaveBeenCalled();
});

