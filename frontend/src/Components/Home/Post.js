import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Post.module.css";
import { useSelector } from "react-redux";

const Post = () => {
  const post = useSelector((state) => state.posts.post[0]);
  const user = useSelector((state) => state.users.user);

  return (
    <div className={styles.post}>
      {user.username && post.title ? (
        <div className={styles.post_container}>
          <h2>{post.title}</h2>
          <div>
            <p className={styles.author}>
              Author: {user.username === post.author ? "me" : post.author}
            </p>
            <p className={styles.author}>Category: {post.category}</p>
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
      ) : (
        <div>
          <h1>Please log in to view posts</h1>
          <Link to={"/login"}>Login</Link>
        </div>
      )}
    </div>
  );
};

export default Post;
