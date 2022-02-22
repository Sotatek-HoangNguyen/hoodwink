// index.component.js

import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { persons: [], currentUser: undefined };
    this.fetchListUser = this.fetchListUser.bind(this);
  }

  fetchListUser() {
    axios
      .get("https://hoodwink.medkomtek.net/api/items", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((response) => {
        console.log("response", response.data);
        this.setState({ persons: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchListUser();

    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  tabRow() {
    return this.state.persons.map((object, i) => {
      console.log("person", object);
      return <TableRow obj={object} key={i} callback={this.fetchListUser} />;
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>List Product</h3>
        </header>
        {currentUser && (
          <Link to={"/add"} className="btn btn-primary">
            Add new product
          </Link>
        )}
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>SKU</th>
              <th>Product Name</th>
              <th>QTY</th>
              <th>Unit</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
