import React from 'react'
import ReactPlayer from 'react-player'
import "./style.css"

export default function Page() {
  return (
    <>
      <div className="fixed">
        <ReactPlayer style={{ height: "70vh", width: "auto" }} controls src='/beerchallenge.mp4' />
      </div>
    </>
  )
}