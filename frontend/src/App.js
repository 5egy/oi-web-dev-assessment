import styles from "../src/styles/App.module.css";
import Write from "./Components/Home/Blogs/Write";
import EditPost from "./Components/Home/Blogs/EditPost";
import Land from "./Components/Landingpage/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Post from "./Components/Home/Post";
import Admin from "./Components/Dashboard/Admin";
import { useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "./Redux/postSlice";
import { getUsers } from "./Redux/userSlice";

import Nav from "./Components/Nav/Nav";
import { userActions } from "./Redux/userSlice";

function App() {
  const posts = useSelector((state) => state.posts.allPosts);
  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());


    if(!user.username && window.localStorage.user){
      dispatch(userActions.setUser())
    }
  }, []);



  return (
    <div className={styles.App}>
      <div className={styles.App_header}>
        <BrowserRouter>
          {user?.username && <Nav />}
          <Routes>
            <Route path={"/"} element={<Home posts={posts} />} />
            <Route path={"/home"} element={<Home posts={posts} />} />
            <Route path={"/posts"} element={<Home posts={posts} />} />
            <Route path="/login" element={<Land />} />
            <Route path="/register" element={<Land />} />
            <Route path={"/post"} element={<Post posts={posts} />} />
            <Route path={"/writepost"} element={<Write />} />
            <Route path={"/writepost/:id"} element={<EditPost />} />
            <Route path={"/admin"} element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
