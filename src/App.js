import React, { Component } from 'react';
import './App.css';
import {Container, Row, Col, FormControl, Button} from 'react-bootstrap';
import Message from './Components/Message'
import io from 'socket.io-client'

class App extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      message: '',
      userId: '',
      messages: []
    }

    this.socket = io('http://localhost:3333')
    this.send = this.send.bind(this)
  }

  componentDidMount() {
    this.socket.on('isLoggedIn', socketId => {
      this.setState({userId: socketId})
    })

    this.socket.on('receivedMessage', messages => {
      this.setState({messages})
      console.log(messages)
    })
  }

  send() {
    if (this.state.message.length) {
      let messageObject = {
        userId: this.state.userId,
        message: this.state.message
      }

      this.socket.emit('sendMessage', messageObject)
      this.setState({message: ''})
    }
  }

  checkFrom(from) {
    if (this.state.userId != from)
      return 'other'
  }

  render() {
    return (
        <Container>
          <Row>
            <Col>
              <div className="messages_area">
                {this.state.messages.map((m) => {
                  return <Message message={m.message} from={this.checkFrom(m.userId)} />
                })}
              </div>
            </Col>
          </Row>
          <div className="col-lg-12">
            <div className="input-group">
              <FormControl type="text" className="form-control" value={this.state.message} placeholder="Write a message" onChange={(e => {this.setState({message: e.target.value})})} />
              <div className="input-group-btn">
                <Button className="btn btn-default" type="button" onClick={this.send}>Send</Button>
              </div>
            </div>
          </div>
        </Container>
    );
  }
}

export default App;
