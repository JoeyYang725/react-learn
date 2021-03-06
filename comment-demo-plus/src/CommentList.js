import React, { Component } from "react"
import Comment from "./Comment"
class CommentList extends Component {
  handleDeleteComment(index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }

  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) => (
          <Comment
            key={i}
            index={i}
            comment={comment}
            onDeleteComment={this.handleDeleteComment.bind(this)}
          />
        ))}
      </div>
    )
  }
}
export default CommentList
