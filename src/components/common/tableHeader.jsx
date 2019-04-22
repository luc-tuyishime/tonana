import React, { Component } from "react"

// columns: array
// sortColumn: object
// onsort: function

class TableHeader extends Component {
  raiseSort = path => {
    // determine the sort order
    const sortColumn = { ...this.props.sortColumn }
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc"
    else {
      sortColumn.path = path
      sortColumn.order = "asc"
    }
    this.props.onSort(sortColumn)
  }

  renderSortIcon = column => {
    // take the actual column you are rendering
    const { sortColumn } = this.props
    if (column.path !== sortColumn.path) return null
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />
    return <i className="fa fa-sort-desc" />
  }

  render() {
    return (
      <ul>
        <li>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </li>
      </ul>
    )
  }
}

export default TableHeader
