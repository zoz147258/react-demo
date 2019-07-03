import { GETTODAY, TODAYTYPE } from "../actions";
import today from  "../../assets/today"


const defaultState = {
   today:today,
   word:""
}

export default (state=defaultState,action)=>{
    console.log(action);

    switch(action.type){

        case GETTODAY:
        return {...state,today:action.today } 
        break;

        case TODAYTYPE:
        return {...state,word:action.word } 
        break;

        default:
        return state;
        break;
    }
}