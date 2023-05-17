import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class TableRow extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td><img src={this.props.obj.image_thumbnail_path} alt='image' width="150"/></td>
        <td>{this.props.obj.id}</td>  
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.network}</td>
        <td>{this.props.obj.country}</td>
        <td>{this.props.obj.start_date}</td>
        <td>{this.props.obj.status}</td>
        <td>
          <Link className="edit-link" to={"/show-details/" + this.props.obj.id}>
            Ver Detalle
          </Link>
        </td>
      </tr>
    );
  }
}