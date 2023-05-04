import React from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import{useSelector} from 'react-redux'
function Workoutform() {
    const[input,setInput] = useState(
        {
            title:'',
            reps:'',
            load:''
        }
    )
    const[error,setError]=useState('')
    const[emptyFields,setEmptyFields] = useState([])
    const user = useSelector(state=>state.auth)


    const handleChange =(e)=>{
      setInput({...input,[e.target.name]:e.target.value})
    } 
    

    const handelSubmit = async(e)=>{
      if(Object.keys(user).length === 0){
        setError('You must be logged in')
        return
      }
      const response = await fetch('https://app-mern-37k5.onrender.com/api/workout',{
        method:'POST',
        body:JSON.stringify(input),
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json = await response.json()
  
      if(json.error){
        setError(json.error)
        setEmptyFields(json.emptyFields)
      }
      if(!json.error){
        setError('')
        setEmptyFields([])
        alert("Record Added")
        window.location.reload()
      }
        
    }
    
    
  return (
   <>
   <Form className='border shadow col-lg-6 col-sm-12 mx-auto p-5'  style={{backgroundColor:'grey'}}>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" value={input.title} onChange={handleChange}
        className = {emptyFields && emptyFields.includes('title')?"border border-danger border-2":''}
        />
       
        <Form.Label>Reps</Form.Label>
        <Form.Control type="number" name='reps' value={input.reps} onChange={handleChange}
        className = {emptyFields &&  emptyFields.includes('reps')?"border border-danger border-2":''}
        />
        
        <Form.Label>Load(Kg)</Form.Label>
        <Form.Control type="number" name='load' value={input.load} onChange={handleChange}
        className = {emptyFields &&  emptyFields.includes('load')?"border border-danger border-2":''}
        />
        
        <br/>
        <Button onClick={handelSubmit}>Submit</Button>

        {error && <p style={{color:'red'}}>{error}</p>}
      </Form>
      
   </>
  )
}

export default Workoutform