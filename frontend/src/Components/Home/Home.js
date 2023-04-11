import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../styles/Home.module.css";

import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../Redux/postSlice";
import { actions } from "../../Redux/postSlice";

const Home = ({ posts }) => {
  const Navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  return (
    <div>
      {user.username !== undefined ? (
        <>
          <h1>{posts.length === 0 ? "Loading..." : "Latest posts:"} </h1>

          <div className={styles.home}>
            {posts.length > 0 &&
              posts.map((p, i) => {
                return (
                  <div className={styles.posts} key={i}>
                    {p.author === user.username && (
                      <>
                        {" "}
                        <div className={styles.edel}>
                          <p
                            className={styles.edit}
                            // onClick={() => Navigate("/writepost/" + p._id)}
                          >
                            edit
                          </p>
                          <p
                            className={styles.delete}
                            onClick={() => dispatch(deletePost(p._id))}
                          >
                            delete
                          </p>
                        </div>
                      </>
                    )}

                    <h2>{p.title}</h2>
                    <p>
                      category: <span>{p.category}</span>
                    </p>

                    <p>
                      tags: <span>{p.tags?.toString()}</span>
                    </p>

                    <p>
                      author: <span>{p.author}</span>
                    </p>
                    <p
                      onClick={() => {
                        dispatch(actions.readPost(p._id));
                        Navigate(`/post/` + p._id);
                      }}
                      className={styles.content}
                    >
                      click to read
                    </p>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div>
          <h1>Please log in to view posts</h1>
          <Link to={"/login"}>Login</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
