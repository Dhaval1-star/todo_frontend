import React, { useContext, useEffect, useReducer, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import signInReducer from '../reducer/signInReducer';
import { UserContext } from '../App';

function Nave(props) {

  const cookies = new Cookies()
  const navigator = useNavigate()
  const [token , setToken] = useState(cookies.get("token"))
  const data1 = useContext(UserContext)


  return (
    <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand > <Link to="/" className='text-light'> Todo App</Link></Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link  className='mx-4'><Link to="/" className='text-light'> Home</Link></Nav.Link>
              <Nav.Link  className='mx-4'><Link to="/todo" className='text-light'> Todo</Link></Nav.Link>
              {
                data1.status == "signOut" ? <Nav.Link  className='mx-4'><Link to="/signIn" className='text-light'> SignIn</Link></Nav.Link> : <Nav.Link  className='mx-4'><Link className='text-light' onClick={data1.userGetSignOut}> Sign Out </Link></Nav.Link>
              }
              <Nav.Link  className='mx-4'><Link to="/register" className='text-light'> Register</Link></Nav.Link>
            </Nav>
          </Container>
        </Navbar>
    </>
  )
}

export default Nave