import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography";
import Column from './column'
import renderer from 'react-test-renderer';
import MessageCard from './message-card';

describe('Column', () => {
    let messages = [
        {
            message: 'Testing 123',
            priority: 3
        },
        {
            message: 'Testing 456',
            priority: 3
        }
    ]

    let deleteFn = jest.fn();
    
    it('renders', () => {
        const testRenderer = renderer.create(<Column messages={messages} delete={deleteFn} title={'Test Title'} />);
        const root = testRenderer.root;

        expect(root.findAllByType(Typography)).toHaveLength(2)
        expect(root.findAllByType(MessageCard)).toHaveLength(2)
        root.findAllByType(MessageCard)[0].props.delete()
        expect(deleteFn).toHaveBeenCalled()

        expect(root.findByProps({className: 'title'}).children[0]).toEqual('Test Title')
        expect(root.findByProps({className: 'subtitle'}).children[0]).toEqual('Count 2')
    })
})