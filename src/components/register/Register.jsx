import React from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../api/api";
import { toast } from "react-toastify";


function Register() {
  const navigate = useNavigate();

   const signupform = async (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.password1.value,
    };
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (data.password.length < 6) {
      toast.error("Password should have at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}user-register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });
      if (response.status === 400) {
        toast.error("Registration failed. Please check your inputs.");
        return;
      }
      toast.success('Succcessfully Registered')
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center  vh-100"style={{backgroundColor: 'ButtonFace'}} >
      <div className="form_container p-5 rounded bg-white " style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <form  onSubmit={(e)=> signupform(e)}>
          <h3 className="text-center mt-10  ">SignUp</h3>
          <div className="mb-2">
            <label  htmlFor="text" style={{ textAlign: "start" }}>Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="form-control"
              name="username"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              name="email"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              name="password"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter ConfirmPassword"
              className="form-control"
              name="password1"
              required
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary">Sign in</button>
          </div>
          <p className="text-end mt-2">
            Already Registred ?{" "}
            <Link to="/login">
              {" "}
              <a href="" className="ms-2" style={{ }}>
                Sign in
              </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
