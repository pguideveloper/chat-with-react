import React, { Component } from 'react';
import './../App.css';

class App extends Component {
    
  constructor(props) {
      super(props)
  }  
    
  render() {
      if (this.props.from != 'other') {
        return (
            <div>
                <div className="message_box message_box_other">
                    <p>{this.props.message}</p>
                </div>
                <div className="clear"></div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="message_box message_box_you">
                <p>{this.props.message}</p>
            </div>
            <div className="clear"></div>
            </div>
        );
    }
  }
}

export default App;
