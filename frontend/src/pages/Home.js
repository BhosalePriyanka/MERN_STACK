import React from 'react'
import{useEffect} from 'react'
import { Row,Col, Container} from 'react-bootstrap'
import Workoutform from '../components/Workoutform'
import Fetchworkout from '../components/Fetchworkout'
import{useDispatch,useSelector} from 'react-redux'
import {setWorkout} from '../Redux/Action'
import {memo} from 'react'

function Home(){
  //code using useState hook
 // const[workout,setWorkout]= useState()
  // const fetchWorkout = async() =>  {
  //   const response = await fetch('http://localhost:4001/api/workout')
  //   const jsondata =  await response.json()
  //   setWorkout(jsondata)
  //   }
  // useEffect(()=>{fetchWorkout()},[])

  const dispatch = useDispatch();
  const user = useSelector(state=>state.auth)
    const fetchProduct = async()=> {
    const response = await fetch('http://localhost:4000/api/workout',{
     headers:{'Authorization':`Bearer ${user.token}`}

    });
    const jsonData = await response.json();
    dispatch(setWorkout(jsonData));      
      
    }
    
    useEffect(() => { 
      if(user){
        fetchProduct()
      }
      },[user]);
    
    const workout = useSelector(state=>state.allWorkout)
console.log(user)
 
  return (
    <>
    <Container className='text-center'>
      <h1>Excercise Monitor App</h1>
    <Row className='m-5'>
    <Col>

    { workout && workout.slice().reverse().map((workout=>(
       <Fetchworkout 
       key = {workout._id}
       workout = {workout}
       />
       )))} 

      
      
      
    </Col>

    <Col>
    <Workoutform/>
    </Col>
    </Row>
    </Container>
    </>
  )
}
export default memo(Home)