import React, { Component } from 'react'
import Column from './column'
import renderer from 'react-test-renderer';
import MessageList from './message-list';


describe('MessageList', () => {
    
    it('renders', () => {
        let state = {
            messages: [
                {
                    message: 'Testing 1',
                    priority: 1
                },
                {
                    message: 'Testing 2',
                    priority: 2
                },
                {
                    message: 'Testing 3',
                    priority: 3
                },
                {
                    message: 'Testing 4',
                    priority: 1
                }
            ],
            newMessage: false
        }
    
        const testRenderer = renderer.create(<MessageList />);
        const root = testRenderer.root;
        const instance = root.instance;

        instance.setState(state);

        expect(root.findAllByProps({className: "clearbutton"})).toHaveLength(2);
        expect(root.findAllByProps({className: "controlbutton"})).toHaveLength(2);

        expect(root.findAllByType(Column)).toHaveLength(3);
    })
     
})