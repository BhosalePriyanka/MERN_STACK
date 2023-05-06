import React from 'react'
import {Button} from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai';
import {useSelector,useDispatch} from'react-redux'
import {removeItem} from '../Redux/Action';
import { memo } from 'react';

// date fns
import {formatDistanceToNow} from 'date-fns'


function Fetchworkout({workout}) {
 //code using useState hook
  // const handelDel = async()=>{ 
  //   const response = await fetch('http://localhost:4001/api/workout/' + workout._id,{
  //   method :'DELETE'
  // })
  //  const json = await response.json()
  //   const filterData = await workout.filter((w)=> w._id !== json._id)
  //  setWorkout(filterData)
  // }

  const dispatch = useDispatch()
  const user = useSelector(state=>state.auth)
  const handelDel = async()=>{ 
    if(!user){
      return
    }
    const response = await fetch('https://backend-mern-sdqt.onrender.com/api/workout/'+ workout._id,{
    method :'DELETE',
    headers:{
      'Authorization':`Bearer ${user.token}`
    }
  })
  dispatch(removeItem(workout._id))
  }
  

  return (
    <>

 {Object.keys(user).length === 0 ? '' :
    <div className='border shadow col-lg-8 col-sm-12 mx-auto m-3'  style={{backgroundColor:'grey'}} key={workout._id}>
    <p><strong>Title- </strong>{workout.title}</p>
    <p><strong>Reps- </strong> {workout.reps}</p>
    <p><strong>Load- </strong>{workout.load}</p>
    {/* <p><strong>Date- </strong>{formatDistanceToNow( new Date(workout.createdAt), { addSuffix: true })}</p> */}
    <Button variant= 'danger'  onClick={handelDel}><AiFillDelete/></Button> 
    </div>
     }


  </>
  )
}

export default memo(Fetchworkout)