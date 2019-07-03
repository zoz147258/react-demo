import {combineReducers} from "redux"
import data from "./data";
import today from "./today";
import banner from "./banner";



export const reducers = combineReducers({
    data:data,
    today:today,
    banner:banner,

})