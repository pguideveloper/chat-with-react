import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import {Container, Row, Col, FormControl, Button, FormGroup, Card} from 'react-bootstrap'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import moment from 'moment'
import io from 'socket.io-client'
import Message from './Components/Message'
import Sidebar from './Components/Sidebar'

library.add(faArrowRight)

class App extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      userEmail: '',
      message: '',
      userId: '',
      login: false,
      messages: [],
      connectedUsers: []
    }

    this.socket = io('http://localhost:3333')
    this.send = this.send.bind(this)
    this.login = this.login.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  componentDidMount() {
    this.socket.on('isLoggedIn', socketId => {
      this.setState({userId: socketId})
    })

    this.socket.on('receivedMessage', messages => {
      this.setState({messages})
      console.log(messages)
    })

    this.socket.on('loggedUsers', users => {
      this.setState({connectedUsers: users})
    })
  }

  scrollToBottom() {
    if (this.messagesEnd) {
        const messageList = this.messagesEnd
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }

  send() {
    if (this.state.message.length) {
      let messageObject = {
        userId: this.state.userId,
        userName: this.state.userName,
        userEmail: this.state.userEmail,
        message: this.state.message,
        messageDatetime: moment().format('DD/MM/Y h:mm:ss')
      }

      this.socket.emit('sendMessage', messageObject)
      this.setState({message: ''})
    }
  }

  login() {
    if (this.state.userEmail && this.state.userName) {
      let userObject = {
        name: this.state.userName,
        email: this.state.userEmail
      }

      this.setState({login: true})
      this.socket.emit('createUser', userObject)
    }
  }

  checkFrom(from) {
    if (this.state.userId != from)
      return 'other'
  }

  render() {
    if (this.state.login) {
        return (
            <Container fluid="true">
                <Col className="col-md-3 no-padding no-margin">
                  <Sidebar connectedUsers={this.state.connectedUsers} you={this.state.userEmail}/>
                </Col>
                <Col className="col-md-9">
                  <div className="messages_area" ref={(elem)=>( this.messagesEnd = elem)}>
                    {this.state.messages.map((m) => {
                      return <Message message={m.message} from={this.checkFrom(m.userId)} userData={m} />
                    })}
                  </div>

                  <Row>
                    <div className="col-lg-12">
                      <div className="input-group">
                        <FormControl type="text" className="form-control" value={this.state.message} placeholder="Write a message" onChange={(e => {this.setState({message: e.target.value})})}  />
                        <div className="input-group-btn">
                          <Button variant="light" type="button" onClick={this.send}><FontAwesomeIcon icon="arrow-right"/></Button>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Col>
            </Container>
      );
    } else {
      return (
        <Container className="login">
        <Card>
          <Card.Body>
            <FormGroup>
                <FormControl type="text" value={this.state.userName} placeholder="Write here your nickname" onChange={(e) => {
                  this.setState({userName: e.target.value})
                }}/>
              </FormGroup>
                
              <FormGroup>
                <FormControl type="text" value={this.state.userEmail} placeholder="Write here your email" onChange={(e) => {
                  this.setState({userEmail: e.target.value})
                }}/>
              </FormGroup>

              <Button className="btn-block" variant="light" type="button" onClick={this.login}>Login</Button>  
          </Card.Body>
        </Card>
        </Container>
      );
    }
  }
}

export default App;
