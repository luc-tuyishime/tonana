import React, { Component } from "react"
import _ from "lodash"

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item)

    return _.get(item, column.path)
  }

  createKey = (item, column) => {
    return item._id + (column.path || column.key)
  }

  render() {
    const { data, columns } = this.props // we pick all the data we need from this.props using array destructuring
    return (
      <ul class="list-group">
        {data.map(item => (
          <li class="list-group-item list-group-item-success" key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}{" "}
                {/* we render content of each td (cells) */}
              </td>
            ))}
          </li>
        ))}
      </ul>
    )
  }
}

export default TableBody
