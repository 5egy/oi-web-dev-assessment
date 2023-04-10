import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from "../../styles/Post.module.css"

const Post = ({posts}) => {
    const url = useLocation()
    const post = posts[url.pathname.slice("/post/".length)]
  return (
    <div className={styles.post}>
      <div className={styles.post_container}>
        <h2>{post.title}</h2>
        <p className={styles.author}>Author: {post.author}</p>
        <p className={styles.content}>{post.content}</p>
      </div>
    </div>
  )
}

export default Post