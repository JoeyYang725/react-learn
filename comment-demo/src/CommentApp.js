import React, { Component } from "react"
import CommentInput from "./CommentInput"
import CommentList from "./CommentList"

class CommentApp extends Component {
  constructor() {
    super()
    this.state = {
      comments: [],
    }
  }
  onSubmit({username, content}) {
    this.setState({
      comments:this.state.comments.concat({username, content})
    })
  }
  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.onSubmit.bind(this)}/>
        <CommentList comments={this.state.comments} />
      </div>
    )
  }
}
export default CommentApp
