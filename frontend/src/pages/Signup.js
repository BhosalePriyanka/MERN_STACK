import { useState } from 'react'
import {Form,Button} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {login} from '../Redux/Action'
import {useNavigate} from 'react-router-dom'

function Signup() {
    
    const authDetails = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(authDetails)
    const[signup,setSignup]= useState(
        {
            email:'',
            password:''
        }
    )
    const[error,setError] = useState(null)
    const handelChange =(e) =>{
        setSignup({...signup,[e.target.name]:e.target.value})
    }
    const handelSubmit = async()=>{
        const response = await fetch('http://localhost:4001/api/user/signup/',{
            method:'POST',
            body:JSON.stringify(signup),
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
            alert('Registered.You are logged in')
            navigate('/home')
            dispatch(login(jsonData))
        }
        
    }

    


  return (
   <>
   <h1 className='text-center'>Signup Form</h1>
   <Form className='col-lg-6 col-sm-12 mx-auto border shadow p-5'>
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" value={signup.email} name="email" onChange={handelChange}/>
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" value={signup.password} name="password" onChange={handelChange}/>
    <br/>
    <Button onClick={handelSubmit}>Submit</Button>
    {error && <p className='text-center' style={{color:'red'}}>{error}</p>}
   </Form>
   
   </>
  )
}

export default Signup