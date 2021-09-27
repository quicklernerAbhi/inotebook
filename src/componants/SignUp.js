import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log(credentials);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (credentials.password !== credentials.cpassword) {
        alert("password is not same");
      }
      // api call for adding a note
      const url = `http://localhost:5000/api/auth/createuser`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      const authtokan = json.authtokan;
      console.log(authtokan);
      const user = json.user;
      console.log(user);
      console.log(json.success);
      localStorage.setItem("authtokan", authtokan);
      if (json.success) {
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="name"
            onChange={handleChange}
            value={credentials.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleChange}
            value={credentials.email}
            required
            minLength="5"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={handleChange}
            value={credentials.password}
            required
            minLength="5"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="cpassword"
            onChange={handleChange}
            value={credentials.cpassword}
            required
            minLength="5"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
