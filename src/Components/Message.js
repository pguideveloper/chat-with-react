import React, { Component } from 'react';
import './../App.css';

class Message extends Component {
    
  constructor(props) {
      super(props)
  }  
    
  render() {
      if (this.props.from != 'other') {
        return (
            <div>
                <div className="message_box message_box_other">
                    <div className="topName">{this.props.userData.userName}</div>
                    <p>{this.props.message}</p>
                    <div className="bottomTime">{this.props.userData.messageDatetime}</div>
                </div>
                <div className="clear"></div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="message_box message_box_you">
                <div className="topName">{this.props.userData.userName}</div>
                <p>{this.props.message}</p>
                <div className="bottomTime">{this.props.userData.messageDatetime}</div>
            </div>
            <div className="clear"></div>
            </div>
        );
    }
  }
}

export default Message;
