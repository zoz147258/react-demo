
import { GETBANNER, ALLGOODSTYPES, MENUTYPES, SEARCHLIST, GETMENUTITLE,  } from "../actions";

import types from  "../../assets/menutypes"



const defaultState = {
    menutypes:[],
    types:types,
    menulist:[],
    menutitle:[]
}

export default (state=defaultState,action)=>{

    switch(action.type){
        
        case MENUTYPES:
        return {...state,menutypes:action.menutypes } 
        break;

        case SEARCHLIST:
        return {...state,menulist:action.menulist } 
        break;

        case GETMENUTITLE:
        return {...state,menutitle:action.menutitle } 
        break;

        default:
        return state;
        break;
    }
}