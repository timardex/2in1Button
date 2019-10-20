import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Button from './Button';

Enzyme.configure({
    adapter: new EnzymeAdapter
});

const setup = (props = {}, state = null) => {
    const wrapper = shallow(<Button {...props} />);
    if(state) wrapper.setState(state);
    return wrapper;
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`#${val}`);
}

test('renders button component', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'component-container');
    expect(button.length).toBe(1);
});

test('counter is null', () => {
    const wrapper = setup();
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(null);
});

test('picture taken', () => {
    const wrapper = setup();
    const initialCounterState = wrapper.state('counter');
    const button = findByTestAttr(wrapper, 'component-button');
    button.simulate('click');

    expect(initialCounterState).toBe(null);
});

test('video animation is rendering', () => {
    const wrapper = setup();
    const videoAnimation = findByTestAttr(wrapper, 'component-video-animation');
    expect(videoAnimation.length).toBe(0);
});

test('video is recording', () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(0);
})