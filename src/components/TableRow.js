// TableRow.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthService from "../services/auth.service";
class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  delete() {
    axios
      .post(
        "https://hoodwink.medkomtek.net/api/item/delete",
        {
          sku: this.props.obj.sku,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      )
      .then(() => {
        this.props.callback();
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { currentUser } = this.state;

    return (
      <tr className="id">
        <td>{this.props.obj.id}</td>
        <td className="sku">{this.props.obj.sku}</td>
        <td>{this.props.obj.product_name}</td>
        <td>{this.props.obj.qty}</td>
        <td>{this.props.obj.unit}</td>
        <td>{this.props.obj.price}</td>
        <td>
          {currentUser && (
            <Link
              to={"/edit/" + this.props.obj.sku}
              className="btn btn-primary"
            >
              Edit
            </Link>
          )}
        </td>
        <td>
          {currentUser && (
            <button onClick={this.delete} className="btn btn-danger">
              Delete
            </button>
          )}
        </td>
      </tr>
    );
  }
}

export default TableRow;
