import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import SnackbarContent from '@material-ui/core/SnackbarContent'

import Api from '../api'
import Column from './column'
import './styles.scss'



class MessageList extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
      newMessage: false
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  componentDidUpdate() {
    console.log(this.state.messages)
  }

  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        message,
        ...messages.slice(),
      ]
    })
  }

  renderControlButton() {
    const isApiStarted = this.api.isStarted()
    return (
      <Button
        variant="contained"
        style={{margin: 10}}
        onClick={() => {
          if (isApiStarted) {
            this.api.stop()
          } else {
            this.api.start()
          }
          this.forceUpdate()
        }}
      >
        {isApiStarted ? 'Stop Messages' : 'Start Messages'}
      </Button>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages.length < this.state.messages.length) {
      this.setState({messages: this.state.messages, newMessage: true})
    }
    if (prevState.newMessage) {
      this.setState({messages: this.state.messages, newMessage: false})
    }
  }

  clearMessages = () => {
    this.setState({
      messages: []
    })
  }

  deleteMessage = (deleteMessage) => {
    this.setState({
      messages: this.state.messages.filter((message) => {return message.message !== deleteMessage.message})
    })
  }

  renderClearButton = () => {
    return (
      <Button
        variant="contained"
        style={{margin: 10}}
        className="button"
        onClick={this.clearMessages}
      >
        Clear
      </Button>
    )
  }

  dismissSnackbar = () => {
    this.setState({messages: this.state.messages, newMessage: false})
  }

  render() {
    let colors = ['#F56236', '#FCE788', '#88FCA3']
    let errors = this.state.messages.filter((message) => {return message.priority === 1})
    let warnings = this.state.messages.filter((message) => {return message.priority === 2})
    let info = this.state.messages.filter((message) => {return message.priority === 3})
    return (
      <div>
        {
          (this.state.newMessage && this.state.messages) ? 
            (<SnackbarContent 
              style={{
                backgroundColor: colors[this.state.messages[0].priority - 1],
                color: "black",
                position: "absolute",
                left: 320
              }}
              open={true}
              autoHideDuration={2000} 
              anchorOrigin={{vertical: 'top', horizontal: 'center'}}
              message={this.state.messages[0].message}
              action={(
                <Button onClick={this.dismissSnackbar}>Dismiss</Button>
              )}>
            </SnackbarContent>) : 
            null
        } 
        {this.renderControlButton()}
        {this.renderClearButton()}
        <div className="message-columns">
          <Column messages={errors} title="Error Type 1" delete={this.deleteMessage}></Column>
          <Column messages={warnings} title="Warning Type 2" delete={this.deleteMessage}></Column>
          <Column messages={info} title="Info Type 3" delete={this.deleteMessage}></Column>
        </div>
      </div>
    )
  }
}

export default MessageList
