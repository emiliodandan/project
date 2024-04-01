import { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';



function Login() {
  const [wrong, setWrong] = useState(false)
  const [error,setError]=useState(false)
  const [data, setData] = useState({
    Username: "",
    Password: ""
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data, [e.target.name]: value
    });
  };
  const navigate = useNavigate();
  const HandleLogin = (e) => {
    e.preventDefault();
    const userData = {
      Username: data.Username,
      Password: data.Password
    };
    console.log(userData);
     try {
       const res= axios.post("http://localhost:8800/login",userData);
      const data=res.data;
      console.log(res);
     if(res.status==200){
       console.log("Login successful");
       navigate("/home");
     }else
     console.log("Login failed",data.error);
   }catch(error){
     console.log("Login error",error);
   }



  }
  return (
    <>
      <div >
        <div >
          <h1>
            Log in
          </h1>
        </div>

        <div className="form">
          <form onSubmit={HandleLogin}>
            <div>
              <label htmlFor="email">
                UserName
              </label>
              <div>
                <input className="inputRegister"
                  id="username"
                  name="Username"
                  type="text"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">
                Password
              </label>
              <div>
                <input  className="inputRegister"
                  id="password"
                  name="Password"
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
          <p>
            Forgot password?
          </p>
          <button className='formButton'>
            <Link to="/register">+
            </Link>
          </button>
          {wrong &&
            <div>
              <span>Wrong Email or Password</span> ,try submitting again.
            </div>
          }
           {error &&
            <div role="alert">
              <span class="font-medium">Server error</span> ,try submitting again.
            </div>
          }
        </div>

      </div>
    </>
  )
}
export default Login;