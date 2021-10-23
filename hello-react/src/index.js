import React, { Component } from "react"
import ReactDOM from "react-dom"
import "./index.css"
// import App from "./App"

class Header extends Component {
  render() {
    return (
      <div>
        <h1>竹逸的React学习笔记</h1>
      </div>
    )
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>,
  document.getElementById("root")
)
