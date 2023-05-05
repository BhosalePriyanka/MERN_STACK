

export const workoutReducers = (state = [], action) => {
switch(action.type){
		case "SET_PRODUCTS": 
		return [...action.payload];
}
switch(action.type){
		case "CREATE":
		return [...state, action.payload]
}

switch(action.type){
		case "REMOVEITEM":
		return state.filter((item) => item._id  !== action.payload);
		default: return state;			
	}

}

export const auth = (state={},action)=>{
switch(action.type){
		case "LOGIN": return {...action.payload};
}
switch(action.type){
		case "LOGOUT": return {}
		default:return state;
}
					
	}

