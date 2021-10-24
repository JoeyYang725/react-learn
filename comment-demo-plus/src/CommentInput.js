import React, { Component } from "react"

class CommentInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      content: "",
    }
  }
  componentDidMount() {
    this.textarea.focus()
  }
  componentWillMount() {
    const username = localStorage.getItem("username")
    if (username) {
      this.setState({
        username,
      })
    }
  }
  _setStorage(username) {
    localStorage.setItem("username", username)
  }
  handleUsernameBlur(e) {
    this._setStorage(e.target.value)
  }
  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    })
  }
  handleContentChange(e) {
    this.setState({
      content: e.target.value,
    })
  }
  handleSubmit() {
    if (!this.state.username || !this.state.content) {
      alert("内容不可为空！")
    } else {
      if (this.props.onSubmit) {
        this.props.onSubmit({
          username: this.state.username,
          content: this.state.content,
          createdTime: +new Date(),
        })
      }
      this.setState({
        content: "",
      })
    }
  }
  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名：</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUsernameChange.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容：</span>
          <div className="comment-field-input">
            <textarea
              ref={(textarea) => (this.textarea = textarea)}
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}
            />
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
