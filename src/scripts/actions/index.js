import axios from  "@/utils/axios"

export const MENUTYPES="qawdasdadw";
export const menuTypes=({url,cb})=>{
    return axios.get(url).then(res=>{
        cb();
        return{
            type:MENUTYPES,
            menutypes:res.data.result
        }
    })

}

export const GETTODAY="qawdas22dadw";
export const getToday=({url,cb})=>{
    return axios.get(url).then(res=>{
        cb();
        return{
            type:GETTODAY,
            today:res
        }
    })

}

export const GETBANNER="qawdas2233dadw";
export const getBanner=({url,cb})=>{
    return axios.get(url).then(res=>{
        cb();
        return{
            type:GETBANNER,
            banner:res.data.STORIES.top_stories
        }
    })

}

export const TODAYTYPE="qawd23as2233dadw";
export const todayType=({word,cb})=>{
    cb();
    return{
        type:TODAYTYPE,
        word
    }

}

export const SEARCHLIST="qawd23a3s2233dadw";
export const searchList=({url,params,cb})=>{
    return axios.get(url,{params}).then(res=>{
        cb();
        return{
            type:SEARCHLIST,
            menulist:res.data.result
        }
    })
}

export const GETMENUTITLE="qawd23dw";
export const getMenuTitle=({url,params,cb})=>{
    return axios.get(url,{params}).then(res=>{
        console.log(res.data.result)
        cb();
        return{
            type:GETMENUTITLE,
            menutitle:res.data.result
        }
    })
}

