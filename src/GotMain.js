import "./Got.css";
import React, { Component } from "react";
import GotFamily from "./GotFamily";

class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.decreasePage = this.decreasePage.bind(this);
    this.increasePage = this.increasePage.bind(this);
  }
  page = 1;

  async componentDidMount() {
    const response = await fetch(
      `https://anapioficeandfire.com/api/houses/?pageSize=15&page=` + this.page
    );
    const json = await response.json();
    this.setState({ data: json });
  }
  decreasePage() {
    if (this.page > 1) {
      this.page--;
      this.componentDidMount();
    }
  }
  increasePage() {
    if (this.page >= 1) {
      this.page = this.page + 1;
      this.componentDidMount();
    }
  }
  render() {
    return (
      <main className="family-input">
        <h1>List of GoT-Families</h1>
        <ol>
          {this.state.data.map((family) => (
            <GotFamily
              className="listEntry"
              key={family.url}
              family={family.name}
              index={family.url.replace(/\D/g, "")}
            />
          ))}
        </ol>

        <div>
          <button className="button" onClick={this.decreasePage}>
            PREV
          </button>
          <button className="button" onClick={this.increasePage}>
            NEXT
          </button>
        </div>
      </main>
    );
  }
}

export default App;
