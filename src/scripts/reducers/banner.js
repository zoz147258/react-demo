import { GETBANNER } from "../actions";



const defaultState = {
    banner:[]
 }
 
 export default (state=defaultState,action)=>{
     console.log(action);
 
     switch(action.type){
 
         case GETBANNER:
         return {...state,banner:action.banner } 
         break;
 
         default:
         return state;
         break;
     }
 }