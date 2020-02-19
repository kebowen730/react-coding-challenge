import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography";
import MessageCard from './message-card'
import './styles.scss'

class Column extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let codes = ['error', 'warning', 'info']
        console.log(this.props.messages)
        return (
        <div className="messagebox">
            <Typography variant="h6">
               {this.props.title}
                <Typography variant="subtitle1">
                    {`Count ${this.props.messages.length}`}
                </Typography>
            </Typography>
            {this.props.messages.map((message, index) => {
                return (<MessageCard delete={this.props.delete} message={message}></MessageCard>)
            })}
        </div>)
    }

}

export default Column
