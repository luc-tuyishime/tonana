import React from "react"

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem
}) => {
  // read item properties from props

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {" "}
          {/* get each item and map it to li */}
          {item[textProperty]}
        </li>
      ))}
    </ul>
  )
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
}

export default ListGroup
