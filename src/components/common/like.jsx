import React from "react"

// Input: liked: boolean
// Output: Onclick

const Like = props => {
  let classes = "fa fa-heart"
  if (!props.liked) classes += "-o"
  return (
    <i
      className={classes}
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    />
  )
}

export default Like
