import {useState} from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import styles from "../../styles/Input.module.css";

const Land = () => {
  const [details, setDetails] = useState({
    username: "",
    password: ""
  })
const url = useLocation()
const Navigate = useNavigate()

async function register(e){
    e.preventDefault();
   const user = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify(details),
      headers: {"'Content-type": "application/json"}
    })

    console.log(user)
}

async function login(e){
  e.preventDefault();

  const data = await fetch("http://localhost:5000/seego")

  console.log(data)
}

  return (
    <div className={styles.input}>

      <h1>Welcome to My Blog App</h1>
      {url.pathname === "/register" ? (
        <form onSubmit={(e)=>register(e)}>
          <input type="text" placeholder="username" name="username" onChange={(e)=>setDetails({...details, [e.target.name]:e.target.value})}/>
          <input type="text" placeholder="password" name="password" onChange={(e)=>setDetails({...details, [e.target.name]:e.target.value})}/>
          <button type="submit">Signup</button>
        </form>
      ) : (
        <form onSubmit={(e)=>login(e)}>
          <input type="text" placeholder="username" name="username" onChange={(e)=>setDetails({...details, [e.target.name]:e.target.value})}/>
          <input type="text" placeholder="password" name="password" onChange={(e)=>setDetails({...details, [e.target.name]:e.target.value})}/>
          <button type="submit">Login</button>
        </form>
      )}

      <div>
        {url.pathname === "/login" ? (
          <p>
            Don't have an account? click <Link to={"/register"}>here</Link> to register
          </p>
        ) : (
          <p>
            Already have an account? click <Link to={"/login"}>here</Link>  to login
          </p>
        )}
      </div>
    </div>
  );
};

export default Land;
