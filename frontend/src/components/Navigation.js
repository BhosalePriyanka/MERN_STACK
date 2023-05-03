import React, { useEffect } from 'react'
import{Link, useNavigate} from 'react-router-dom'
import {Container, Navbar,NavLink,Nav, NavDropdown} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {logout,login} from '../Redux/Action'


function Navigation() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const reduxDetails = useSelector(state=>state.auth)
  const userDetails =JSON.parse(localStorage.getItem('user'))
  const handelLogout =()=>{
    localStorage.clear()
    navigate('/login')
    dispatch(logout(reduxDetails))
  }
useEffect(()=>{
  if(userDetails){
    dispatch(login(userDetails))
  }
},[])

  

  return (
   <>
   <div className='border shadow p-4'  style={{backgroundColor:'black'}}>
    <Navbar variant = 'dark'bg = 'dark' expand='lg' fixed='top'>
      <Container>
      <Navbar.Toggle  area-control='area' variant='dark'/>
    <Navbar.Collapse id='area'>
  <Nav>
  <NavLink as={Link} to ='/home'>Workout buddy</NavLink>
   {userDetails ?
   <NavDropdown title={userDetails && userDetails.email}>
    <NavDropdown.Item onClick={handelLogout}>Logout</NavDropdown.Item>
   </NavDropdown>
   :
   <NavLink as={Link} to ='/login'>Login</NavLink>
  }
  </Nav>
   

    
    </Navbar.Collapse>

      </Container>
   
    </Navbar>

   </div>
   </>
  )
}

export default Navigation