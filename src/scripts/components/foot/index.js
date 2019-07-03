
import "./index.scss"

export const foots=[
    {txt:"最新",path:"/app/home",name:"home",icon:"iconfont icon-zuixinnew3"},
    {txt:"分类",path:"/app/classify",name:"classify",icon:"iconfont icon-leimupinleifenleileibie"},
    {txt:"我",path:"/app/mine",name:"mine",icon:"icon-minefill"}
]
import  {Link,NavLink} from "react-router-dom"
import {Badge} from "antd-mobile"

export const Foot=()=>{
    return (
        <footer>
            {
                foots.map((item,i)=>{
                    return (
                        <div key={i}>
                            <NavLink to={item.path} activeClassName="nav-active">
                                <i className={"iconfont icon " + item.icon}></i>
                                <span>{item.txt}</span>
                                {i==2&&<Badge className="hot"  style={{ marginLeft: 12 }}></Badge>}
                            </NavLink>
                        </div>
                    )
                })
            }
        </footer>
    )
}
