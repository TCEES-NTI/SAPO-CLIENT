import React, { Component } from 'react'
import './PostList.css'
import { PageHeader } from 'react-bootstrap';

class PostList extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
    }
  }

  fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(res => {
        this.setState({posts: res});
      })
      .catch(err => console.log(err))
  }
  
  componentDidMount() {
    this.fetchPosts()
  }

  render() {
    return (
      <div className="PostList">
        <PageHeader>Post List</PageHeader>
        {this.state.posts.map(post => (
          <div className="PostDiv" key={post.id}>
            <h2 className="PostTitle">{post.title}</h2>
            <p className="PostBody">{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export { PostList }
