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
  componentWillMount() {
    const comments = JSON.parse(localStorage.getItem("comments"))
    if (comments) {
      this.setState({
        comments,
      })
    }
  }
  componentWillUnmount() {
    clearInterval(this._timer)
  }
  handleDeleteComment(index) {
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({ comments })
    this._saveComments(comments)
  }
  _saveComments(comments) {
    localStorage.setItem("comments", comments)
  }
  onSubmit({ username, content, createdTime }) {
    this.setState({
      comments: this.state.comments.concat({ username, content, createdTime }),
    })
    localStorage.setItem("comments", JSON.stringify(this.state.comments))
  }
  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.onSubmit.bind(this)} />
        <CommentList
          comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment.bind(this)}
        />
      </div>
    )
  }
}
export default CommentApp
