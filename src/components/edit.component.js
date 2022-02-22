// edit.component.js

import React, { Component } from "react";
import axios from "axios";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeSku = this.onChangeSku.bind(this);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.onChangeUnit = this.onChangeUnit.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      sku: "",
      product_name: "",
      qty: "",
      unit: "",
      status: 0, // Number
    };
  }

  componentDidMount() {
    axios
      .post("https://hoodwink.medkomtek.net/api/item/search", {
        sku: this.props.match.params.id,
      })
      .then((response) => {
        this.setState({
          sku: response.data.sku,
          product_name: response.data.product_name,
          qty: response.data.qty,
          price: response.data.price,
          unit: response.data.unit,
          status: response.data.status,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeSku(e) {
    this.setState({
      sku: e.target.value,
    });
  }

  onChangeProductName(e) {
    this.setState({
      product_name: e.target.value,
    });
  }

  onChangeQty(e) {
    this.setState({
      qty: e.target.value,
    });
  }

  onChangeUnit(e) {
    this.setState({
      unit: e.target.value,
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value,
    });
  }

  onChangeActive(e) {
    this.setState({
      active: e.target.checked,
    });
  }

  onChangeSlackUserName(e) {
    this.setState({
      slack_username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      sku: this.state.sku,
      product_name: this.state.product_name,
      qty: this.state.qty,
      price: this.state.price,
      unit: this.state.unit,
      status: this.state.status,
    };

    axios
      .post("https://hoodwink.medkomtek.net/api/item/update", obj, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        this.props.history.push("/");
      });
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <h3 align="center">Update Product</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>sku: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.sku}
                readonly
              />
            </div>
            <div className="form-group">
              <label>Product name: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.product_name}
                onChange={this.onChangeProductName}
              />
            </div>
            <div className="form-group">
              <label>qty: </label>
              <input
                type="number"
                className="form-control"
                value={this.state.qty}
                onChange={this.onChangeQty}
              />
            </div>
            <div className="form-group">
              <label>Unit: </label>
              <input
                type="number"
                className="form-control"
                value={this.state.unit}
                onChange={this.onChangeUnit}
              />
            </div>
            <div className="form-group">
              <label>Status: </label>
              <input
                type="number"
                className="form-control"
                value={this.state.status}
                onChange={this.onChangeStatus}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Update Product Info"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
