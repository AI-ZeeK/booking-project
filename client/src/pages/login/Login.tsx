import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch }: any = useContext<any>(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGIN_START" });
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err: any) {
      console.log("red");
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <form className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button
          //   type="submit"
          disabled={loading}
          onClick={handleClick}
          className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </form>
  );
};

export default Login;
