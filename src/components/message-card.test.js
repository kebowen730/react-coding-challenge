import React, { Component } from 'react'
import TestRenderer from 'react-test-renderer';
import MessageCard from './message-card';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'


describe('MessageCard', () => {
    let message = {
        message: 'Testing 123',
        priority: 3
    }

    let deleteFn = jest.fn();
    
    it('renders', () => {
        const testRenderer = TestRenderer.create(<MessageCard message={message} delete={deleteFn}/>);
        const root = testRenderer.root;

        expect(root.findAllByType(Card)).toHaveLength(1)
        expect(root.findByProps({className: 'message-text'}).children[0]).toEqual('Testing 123')
        expect(root.findAllByType(Button)).toHaveLength(1)
    })

    it('calls the delete function when clear is clicked', () => {
        const testRenderer = TestRenderer.create(<MessageCard message={message} delete={deleteFn}/>);
        const root = testRenderer.root;

        let button = root.findByType(Button)
        button.props.onClick()
        expect(deleteFn).toHaveBeenCalled()
    })    
})