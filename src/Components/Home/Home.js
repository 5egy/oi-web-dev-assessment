import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../styles/Home.module.css";

const Home = ({posts}) => {
    const Navigate = useNavigate();

  return (
    <div className={styles.home}>
      
      <div className={styles.link}>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </div>

        <h1>Latest posts: </h1>
      {posts.map((p, i) => {
        return (
          <div className={styles.posts} key={i} onClick={()=>Navigate(`/post/${i}`)}>
            <h2>{p.title}</h2>
            <p>{p.content.slice(0, 137)}...</p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
