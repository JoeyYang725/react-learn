import React, { Component } from "react"

class CommentInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      content: "",
    }
  }
  handleUsernameChange(e){
    this.setState({
      username:e.target.value
    })
  }
  handleContentChange(e) {
    this.setState({
      content: e.target.value
    })
  }
  handleSubmit(){
    if (!this.state.username||!this.state.content) {
      alert('内容不可为空！')
    } else {
      if (this.props.onSubmit) {
        const {username,content} = this.state
        this.props.onSubmit({username,content})
      }
      this.setState({
        content:''
      })
    }
    }
  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名：</span>
          <div className="comment-field-input">
            <input value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容：</span>
          <div className="comment-field-input">
            <textarea value={this.state.content} onChange={this.handleContentChange.bind(this)}/>
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit.bind(this)}>发布</button>
        </div>
      </div>
    )
  }
}
export default CommentInput
