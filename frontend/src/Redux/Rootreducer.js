import {workoutReducers , auth, } from './Reducer';
import {combineReducers} from 'redux';

export const RootReducers = combineReducers({
	allWorkout: workoutReducers,
	auth:auth,
	
		
});
