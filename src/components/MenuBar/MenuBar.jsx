import React from 'react'
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap';

function Menubar({heading}) {
    const navigate = useNavigate()
    
    const logout = ()=>{
        localStorage.removeItem('authToken');
        navigate('/login')

    }
  return (
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <h4>{heading}</h4>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/')}>Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <img width={30} className='me-3' onClick={()=>navigate('/profile')} src="https://static.vecteezy.com/system/resources/previews/007/033/146/original/profile-icon-login-head-icon-vector.jpg" alt="" />
      <button onClick={logout} className='btn btn-warning me-4'>Logout</button>
    </Navbar>
  )
}

export default Menubar
