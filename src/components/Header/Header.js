import React, { Component } from "react";
import "./Header.css";
class Header extends Component {
  render() {
    return (
      <div className="header" id="Header">
        <div className="row column">
          <h1 id="tit">{this.props.name}</h1>
        </div>
      </div>
    );
  }
}
export default Header;
