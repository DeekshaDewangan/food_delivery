import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // For navigation to main page
  let navigate = useNavigate()

  // When form gets submitted the endpoint is hitted
  const handleSubmit = async (e) => {
    // A synthetic event {was asked in interview}
    // React uses synthetic events to handle events from button, input and form elements
    // A preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
    e.preventDefault();

    // This endpoint will get hit
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    // We have to cosole.log() the response before that we have to stringify it using json
    const json = await response.json();
    console.log(json);

    // This is according to response we get after submitting form to link the concept visit createuser in backend routes
    if (!json.success) {
      alert("Enter Valid Credentials");
    }

    // If credentials are correct it will redirect to home page
    if (json.success) {

      // It is stored in local storage
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }
  };

  const onChange = (event) => {
    
    // It will set the value as per the name
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              // To associate the useState with form
              name="email"
              value={credentials.email}
              // To make is dynamic since without using oncliclk the value specified before will be shown
              // onChage function is linked
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              // type="password" shows the passwornd in form in dotted form
              type="password"
              className="form-control"
              // To associate the useState with form
              name="password"
              value={credentials.password}
              // To make is dynamic since without using oncliclk the value specified before will be shown
              // onChage function is linked
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            I'm a new user
          </Link>
        </form>
      </div>
    </>
  );
}
