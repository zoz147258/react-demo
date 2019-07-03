import {observable, action, computed, autorun} from "mobx";
import axios from "@/utils/axios"

class UserInfo{
    @observable user=[]
    // @observable _id=""
    @action getUserInfo = (_id)=>{
        console.log(_id)
        const obj = {
            _id
        }
        axios.get("/react/getuserinfo",{
            params:obj
        }).then(res=>{
            console.log(res.data.result);
            this.user = res.data.result;
        })
    }

}

export default new UserInfo();