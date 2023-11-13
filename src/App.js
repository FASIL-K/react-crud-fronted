import './App.css';
import  {Route,Routes,BrowserRouter as Router } from 'react-router-dom'
import Register from './components/register/Register';
import Login from './components/login/Login';
 import Admin from './components/admin/Admin';
import Profile from './components/profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PrivateRoute } from './components/PrivateRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Test from './components/test';



function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route element={ <PrivateRoute />  } path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={ <Login /> } path="/login" />
          <Route element={ <Admin />  } path="/admin" />
          <Route element={ <Profile />  } path="/profile" />
          <Route element={ <Test/> } path="/test" />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
