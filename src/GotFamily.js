import React, { Component } from "react";
import "./Got.css";
import { Link } from "react-router-dom";

class GotFamily extends Component {
  componentDidMount = () => {
    console.log(this.props.index);
  };

  render() {
    return (
      <Link
        className="listEntry"
        to={{
          pathname: "/got/" + this.props.index,
          state: { name: "25" },
        }}
      >
        {this.props.family}
      </Link>
    );
  }
}

export default GotFamily;
