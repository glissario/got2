import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";

import "./GotDetails.css";

class GotDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      family: [],
      validateWappon: false,
      overlord: [],
      followers: [],
      indexOverlord: Number,
    };
  }

  async componentDidMount() {
    const houseID = this.props.location.pathname.replace(/\D/g, "");
    const apiLink = "https://anapioficeandfire.com/api/houses/" + houseID;
    const response = await fetch(apiLink);
    const json = await response.json();
    this.setState({ family: json });

    if (this.state.family.coatOfArms !== "") {
      this.validateWappon = true;
    }

    if (this.state.family.overlord !== "") {
      this.state.indexOverlord = this.state.family.overlord.replace(/\D/g, "");
      this.getOverlord();
    }
    if (this.state.family.swornMembers.length > 0) {
      this.getSwornMembers();
    }
  }

  async getOverlord() {
    this.validateOverlord = true;

    const OlApiUrl =
      "https://anapioficeandfire.com/api/houses/" + this.state.indexOverlord;
    const httpElement = await fetch(OlApiUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const jsonData = await httpElement.json();
    this.state.overlord = jsonData;
    this.forceUpdate();
  }
  async getSwornMembers() {
    this.validateLength = true;
    for (let i = 0; i < this.state.family.swornMembers.length; i++) {
      const memberApiUrl =
        "https://anapioficeandfire.com/api/characters/" +
        this.state.family.swornMembers[i].replace(/\D/g, "");

      const httpElement = await fetch(memberApiUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const jsonData = await httpElement.json();
      this.state.followers.push(jsonData.name);
      this.forceUpdate();
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <main>
        <section className="fam-description">
          <h2>
            {this.state.family.name + " from " + this.state.family.region}
          </h2>
          <p className="coatOfArms">
            <strong>CoatOfArms: </strong>
            {this.state.family.coatOfArms}{" "}
          </p>

          <Link
            className="listEntry"
            to={{
              pathname: "/got/" + this.state.indexOverlord,
              state: { name: "25" },
            }}
          >
            <strong>Overlord: </strong>
            {this.state.overlord.name}
          </Link>
          <h3>Follower:</h3>
          <div className="followers">
            {this.state.followers.map((follower) => (
              <label className="follower" key={this.state.followers.url}>
                {follower}
              </label>
            ))}
          </div>
          <button class="button" onClick={this.props.history.goBack}>
            BACK
          </button>
        </section>
      </main>
    );
  }
}

export default GotDetails;
