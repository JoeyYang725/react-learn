import React, { Component } from "react"
import ReactDOM from "react-dom"
import "./index.css"
// import App from "./App"

class Title extends Component {
  render() {
    return <div>this is a TITLE</div>
  }
}
class Header extends Component {
  constructor() {
    super()
    this.state = {
      isGood: true,
    }
  }
  onChange() {
    this.setState({
      isGood: !this.state.isGood,
    })
  }
  render() {
    //render支持变量
    const aClass = "class"
    const GoodJoey = <div>Joey is good!</div>
    const BadJoey = <div>Joey is bad</div>
    return (
      //JSX属性、子元素支持js表达式
      <div className={aClass}>
        {this.state.isGood ? GoodJoey : BadJoey}
        <button onClick={this.onChange.bind(this)}>点击改变Joey</button>
        <Title />
      </div>
    )
  }
}
class Main extends Component {
  render() {
    return <div>this is a MAIN</div>
  }
}
class Footer extends Component {
  render() {
    return <div>this is a FOOTER</div>
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Main />
    <Footer />
  </React.StrictMode>,
  document.getElementById("root")
)
