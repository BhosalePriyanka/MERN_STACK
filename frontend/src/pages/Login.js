import React from 'react'
import { useState } from 'react'
import {Form,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../Redux/Action'

function Login() {
    const[loginDetails,setLogin]= useState(
        {
            email:'',
            password:''
        }
    )
    const[error,setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handelChange =(e) =>{
        setLogin({...loginDetails,[e.target.name]:e.target.value})

    }
    const handelSubmit = async()=>{
      const response = await fetch('https://backend-mern-sdqt.onrender.com/api/user/login/',{
          method:'POST',
          body:JSON.stringify(loginDetails),
          headers:{
              'Content-Type':'application/json' 
          }
      })
      const jsonData = await response.json()
      console.log(jsonData)
     
      if(jsonData.error){
          setError(jsonData.error)
      }
      if(!jsonData.error){
          setError('')
          localStorage.setItem('user', JSON.stringify(jsonData))
          navigate('/home')
          dispatch(login(jsonData))
      }
  }

  const authDetails = useSelector(state=>state.auth)
  
  return (
    <>
    <h1 className='text-center'>Login Form</h1>
    <Form className='col-lg-6 col-sm-12 mx-auto border shadow p-5'>
     <Form.Label>Email</Form.Label>
     <Form.Control type="email" value={loginDetails.email} name="email" onChange={handelChange}/>
     <Form.Label>Password</Form.Label>
     <Form.Control type="password" value={loginDetails.password} name="password" onChange={handelChange}/>
     <br/>
     <p className='text-center'>Note:New User Register Now</p>
     <Button onClick={handelSubmit}>Submit</Button>
     <Button as={Link} to={'/signup'} className='mx-2'>Signup</Button>
     {error && <p className='text-center' style={{color:'red'}}>{error}</p>}
    </Form>
    </>
  )
}

export default Login