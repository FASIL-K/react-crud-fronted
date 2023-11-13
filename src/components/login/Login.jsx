import React, { useEffect } from "react";
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { getLocal } from "../../helpers/auth";
import { baseUrl } from "../../api/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../Redux/UserSlice";
import jwtDecode from 'jwt-decode';



function Login() {
    const navigate =useNavigate();
    const response = getLocal();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if (response){
            navigate("/")

        }
    },[response,navigate]);
    
    const signupSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch(`${baseUrl}token/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: e.target.email.value,
            password: e.target.password.value,
          }),
        });
    
        const data = await response.json();
        try{
          const token =jwtDecode(data.access)
            const setuser={
                "user_id":token.user_id,
                "name":token.username,
                "email":token.email,
                "is_admin":token.is_admin
            }
            dispatch(setUserInfo({userinfo:setuser}))

        }catch (error){
          navigate('/')
          console.error('Error decoding JWT:',error);
        }
        if (response.status === 200) {
          localStorage.setItem("authToken", JSON.stringify(data));
          navigate("/");
        } else if (response.status === 401) {
          toast.error("User credentials mismatch");
          navigate("/login");
        }
      };

  return (
    <div className="login template d-flex justify-content-center align-items-center  vh-100"style={{backgroundColor: 'ButtonFace'}} >
      <div className="form_container p-5 rounded bg-white " style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <form onSubmit={(e) => signupSubmit(e)}>
          <h3 className="text-center">Signin</h3>
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
          
          <div className="d-grid">
            <button className="btn btn-primary">Sign in</button>
          </div>
          <p className="text-end mt-2">
           Don't have an a account? <Link to="/register"> <a href="" className="ms-2">Sign up</a></Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
