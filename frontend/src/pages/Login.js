import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { usersBaseUrl } from "../constants/url.constant";

function Login() {
  const [wrong, setWrong] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    isAdmin: false
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };
  const navigate = useNavigate();
  const HandleLogin = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const res = await axios.get(
        usersBaseUrl + "GetUser/" + data.username + "/" + data.password
      );
      const responseData = res.data; // Use a different variable name here
      console.log(res);
      if (res.status === 200) {
        console.log("Login successful");
        navigate("/home");
      } //else console.log("Login failed", responseData.error);
    } catch (error) {
      console.log("Login error", error);
    }
  };
  
  return (
    <>
      <div>
        <div>
          <h1>Log in</h1>
        </div>

        <div className="form">
          <form onSubmit={HandleLogin}>
            <div>
              <label htmlFor="email">UserName</label>
              <div>
                <input
                  className="inputRegister"
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div>
                <input
                  className="inputRegister"
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <button type="submit" className="Button">
                Login
              </button>
            </div>
          </form>
          <p>Forgot password?</p>
          <button className="formButton">
            <Link to="/register">+</Link>
          </button>
          {wrong && (
            <div>
              <span>Wrong Email or Password</span> ,try submitting again.
            </div>
          )}
          {error && (
            <div role="alert">
              <span class="font-medium">Server error</span> ,try submitting
              again.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Login;
