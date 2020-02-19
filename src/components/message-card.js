import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import './styles.scss'

class MessageCard extends Component {   
    colors = {
        error: '#F56236',
        warning: '#FCE788',
        info: '#88FCA3'
    } 
    render() {
        let codes = ['error', 'warning', 'info']
        let code = codes[this.props.message.priority - 1]


        return (<Card style={{ backgroundColor: this.colors[code] }} className="message-card" >
            <div className="message-text" style={{width: 240}}>{this.props.message.message}</div>
            <Button className="delete-button" onClick={() => {this.props.delete(this.props.message)}}>Clear</Button>
        </Card>)
    }
}

export default MessageCard