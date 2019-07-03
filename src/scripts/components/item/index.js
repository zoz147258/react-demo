import "./index.scss"

import {WingBlank,WhiteSpace ,List} from "antd-mobile";
import {Link} from "react-router-dom"

const Items = List.Item;
const Brief = Items.Brief;
export class Item extends Component{
    render(){
        const {
            good
        } = this.props;
        return (
            <div className="move-in item">
                <Link to={"/good/detail/"+good._id+"?name="+good.name } >
                    <WhiteSpace/>
                    <WingBlank>
                    
                        <List >
                            <Items >{good.desc} <Brief>{good.who}</Brief></Items>
                        </List>
                    
                        {/* <h2 style={{color:"yellowgreen",fontSize:".4rem"}}>
                            {good.name} === RMB --- {good.price} - type={good.type.text}
                        </h2> */}
                    </WingBlank> 
                </Link>
            </div>
        )
    }
}