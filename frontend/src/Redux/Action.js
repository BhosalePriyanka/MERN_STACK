export const setWorkout= (workouts) => {
    return {
            type : "SET_PRODUCTS",
              payload : workouts 
          } 
    };


export const removeItem = (id) =>{
      return{
        type: "REMOVEITEM",
        payload:id
      };
    };

export const createWorkout = (workouts) =>{
      return{
        type: "CREATE",
        payload:workouts
      }
    }
    
 export const login = (user) =>{
      return{
        type:"LOGIN",
        payload:user
      }
    }
    export const logout = (user) =>{
      return{
        type:"LOGOUT",
        payload:user
      }
    }