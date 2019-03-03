import React, { Component } from 'react';
import './../App.css';

class Sidebar extends Component {
    
  constructor(props) {
      super(props)

      this.connectedUser = this.connectedUser.bind(this)
  }  

  connectedUser(user) {
    if (this.props.you === user)
        return 'Me'
    return user
  }
    
  render() {
    return (
        <div className="sidebar">
            {this.props.connectedUsers.map((user) => {
                 return <div> {this.connectedUser(user.email)} <hr/></div>
            })}
        </div>
    );
  }
}

export default Sidebar;
