// form to input username and password for registering and loggin in

import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

// route: the route that we want the func to go
// method: registering/logging in
function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // var for method
  const methodUsed = method === "login" ? "Login" : "Register";
  // prevent to submit the form and remove the default behavior
  const handleSubmit = async (e) => {
    // when submit the form, set the loading to true
    setLoading(true);
    e.preventDefault();

    try {
      // send a request
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
        // if the method is register, we can navigate it to login page after registering
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* If the method is login, it will print "Login", otherwise it will print "Register" */}
      <h1>{methodUsed}</h1>
      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {/* show loading indicator when submitting the form/when it's loading */}
      {loading && <LoadingIndicator />}
      <button type="submit" className="form-button">
        {methodUsed}
      </button>
    </form>
  );
}

export default Form;
