import React, { useEffect, useState } from "react";
import style from "../../../styles/Write.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost, editPost } from "../../../Redux/postSlice";


const Write = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.posts.edit);

  const [post, setPost] = useState({});
  console.log(edit._id);

  useEffect(() => {
    async function editPost() {
      await dispatch(getPost(id)).unwrap();
    }

    editPost();
  }, []);

  function changeValue(e) {
    setPost({ ...post, [e.name]: e.value });
  }

  return (
    <div>
      <h4>Create Post</h4>
      <form
        className={style.form}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(editPost(edit._id, post));
        }}
      >
        <div>
          <input
            type="text"
            name="title"
            value={post.title ?? edit.title}
            onChange={(e) => changeValue(e.target)}
            placeholder="title"
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            type="text"
            name="category"
            value={post.category ?? edit.category}
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
            value={post.tags ?? edit.tags}
            onChange={(e) => changeValue(e.target)}
            placeholder="tags"
          />
        </div>

        <div>
          {/* <textarea type="text" name='content' cols={20} rows={15} onChange={(e)=>changeValue(e.target)}></textarea> */}
          <ReactQuill
            className={style.text}
            placeholder="content"
            value={post.content ?? edit.content}
            onChange={(e) => {
              setPost({ ...post, content: e });
            }}
          />
        </div>

        <button >Update Post</button>
      </form>
    </div>
  );
};

export default Write;
