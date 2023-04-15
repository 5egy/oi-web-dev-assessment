import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/Input.module.css";

import { postUser } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Land = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.allUsers);
  const [details, setDetails] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
  });

  const url = useLocation();

  async function register(e) {
    e.preventDefault();
    const con = users.filter((el) => el.username === details.username);
    
    if (con.length > 0) {
     
      alert("username already exist");
      return
    }
    await dispatch(postUser(details)).unwrap();
    Navigate("/home");
    window.localStorage.user = JSON.stringify(details);
  }

  async function login(e) {
    e.preventDefault();
    await dispatch(postUser(details)).unwrap();
    Navigate("/home");
    window.localStorage.user = JSON.stringify(details);
  }

  return (
    <div className={styles.input}>
      <h1>Welcome to My Blog App</h1>
      {url.pathname === "/register" ? (
        <form onSubmit={(e) => register(e)}>
          <input
            type="text"
            placeholder="username"
            name="username"
            required
            onChange={(e) => {
              setDetails({ ...details, [e.target.name]: e.target.value });
            }}
          />

          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={(e) =>
              setDetails({ ...details, [e.target.name]: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="password"
            name="password"
            required
            onChange={(e) =>
              setDetails({ ...details, [e.target.name]: e.target.value })
            }
          />
          {details.password.length < 6 || details.username.length < 4 ? (
            <button type="submit" disabled>
              Signup
            </button>
          ) : (
            <button type="submit">Signup</button>
          )}
        </form>
      ) : (
        <form onSubmit={(e) => login(e)}>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => {
              setDetails({ ...details, [e.target.name]: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="password"
            name="password"
            onChange={(e) =>
              setDetails({ ...details, [e.target.name]: e.target.value })
            }
          />
          <button type="submit">Login</button>
        </form>
      )}

      {url.pathname === "/register" && (
        <p className={styles.info}>
          username must be longer than 4 words and password more than 6
          characters
        </p>
      )}

      <div>
        {url.pathname === "/login" ? (
          <p>
            Don't have an account? click <Link to={"/register"}>here</Link> to
            register
          </p>
        ) : (
          <p>
            Already have an account? click <Link to={"/login"}>here</Link> to
            login
          </p>
        )}
      </div>
    </div>
  );
};

export default Land;
