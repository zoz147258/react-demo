
import "./index.scss"
import history from "@/utils/history"

import {NavBar,Icon,Drawer, List,} from "antd-mobile"
export class Head extends Component{
    goback=(show)=>{
     
      if(show){
          history.go(-1);
      }
    }
    goSearch = ()=>{
   
        history.push("/search");
    }

    render(){
        const  {
            title,
            show
        }  = this.props;
        return (
            <div>
                 <NavBar
                mode="dark"
                icon={show&&<Icon type="left" />}
                onLeftClick={() => this.goback(show)}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.goSearch}/>,
                    // <Icon key="1" type="ellipsis" onClick={() => this.onDock('docked')}/>,
                ]}
                > {title }</NavBar>
            </div>
           
        )
    }
}



