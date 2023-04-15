import React, { useState } from "react";
import style from "../../../styles/Write.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector, } from "react-redux";
import { writePost } from "../../../Redux/postSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Write = () => {
  const Navigate = useNavigate()
  const dispatch = useDispatch();
  const [post, setPost] = useState( {
    title: "",
    content: "",
    category: "tech",
    tags: "",
    author: "",
    comments: [],
  },)
  const user = useSelector(state => state.users.user)

  function changeValue(e) {
    setPost({ ...post, [e.name]: e.value });
  }

  async function createPost(e) {
    e.preventDefault();
    await dispatch(writePost({...post, author: user.username})).unwrap()
    alert("post uploaded")
    Navigate("/home")
  }

  return (
    <div>
      <h4>Create Post</h4>
     {user.username ?
       <form className={style.form} onSubmit={(e) => createPost(e)}>
       <div>
         <input
           type="text"
           name="title"
           value={post.title}
           onChange={(e) => changeValue(e.target)}
           placeholder="title"
         />
       </div>
       <div>
         <label htmlFor="category">Category:</label>
         <select
           type="text"
           name="category"
           value={post.category}
           onChange={(e) => changeValue(e.target)}
         >
           <option value="Tech">Tech</option>
           <option value="Sports">Sports</option>
           <option value="Entertainment">Entertainment</option>
           <option value="Business">Business</option>
         </select>
       </div>

       <div>
         <input
           type="text"
           name="tags"
           value={post.tags}
           onChange={(e) => changeValue(e.target)}
           placeholder="tags"
         />
       </div>

       <div>
         {/* <textarea type="text" name='content' cols={20} rows={15} onChange={(e)=>changeValue(e.target)}></textarea> */}
         <ReactQuill
           className={style.text}
           placeholder="content"
           value={post.content}
           onChange={(e) => {
             setPost({ ...post, content: e });
           }}
         />
       </div>

       <button>Create Post</button>
     </form> :  <div>
         <h1>Please log in to view posts</h1>
         <Link to={"/login"}>Login</Link>
       </div>
     }
    </div>
  );
};

export default Write;
