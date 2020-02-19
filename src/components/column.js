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
        return (
        <div className="messagebox">
            <Typography variant="h6" className="title-box">
               <div className="title">{this.props.title}</div>
                <Typography variant="subtitle1" className="subtitle-box">
                    <div className="subtitle">{`Count ${this.props.messages.length}`}</div>
                </Typography>
            </Typography>
            {this.props.messages.map((message, index) => {
                return (<MessageCard key={index} delete={this.props.delete} message={message}></MessageCard>)
            })}
        </div>)
    }

}

export default Column
