import React from 'react'

export default function Button(props) {
  return (
    <span className={props.lost} style={{backgroundColor: props.backgroundColor, color: props.color }}>{props.name}</span>
  )
}
