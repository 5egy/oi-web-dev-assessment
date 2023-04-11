import React from "react";
import styles from "../../styles/Admin.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {
  const admin = useSelector((state) => state.users.user);
  

  return (
    <div className={styles.dashboard}>
      {admin.username ?
        <>
          <div className={styles.details}>
            <h5>{admin.fullName}</h5>
            <p>@{admin.username}</p>
          </div>

          <div className={styles.link}>
            <Link to={"/writepost"}>create post</Link>
            <Link to={"/"}>show posts</Link>
          </div>

          {/* <div className={styles.comments}>
      <h1>comments:</h1>
    <div className={styles.comment}>
        <p className={styles.delete}>X</p>
        <p className={styles.text}>
          jfdskjhbldefgjhnvkdnfknv;.kdfn;v.kndf;kvn;dkfnv/kldnlfvnkvnvv v
          vfujvpebiverv perdfvp9u wdv[s dvcu[s dvupdvu dvpwu v scsd xc{" "}
        </p>

        <p className={styles.author}>@Kola234</p>
      </div>
    </div> */}
        </> :  <div>
          <h1>Please log in to view posts</h1>
          <Link to={"/login"}>Login</Link>
        </div>
      }
    </div>
  );
};

export default Admin;
