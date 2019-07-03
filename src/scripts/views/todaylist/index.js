import "./index.scss"
import { Head } from "../../components/head";
import { connect } from "react-redux"
import { WingBlank, WhiteSpace, List } from "antd-mobile"
const Item = List.Item;
const Brief = Item.Brief;


@connect(
    state => {
        return {
            ...state.today
        }
    }
)
export class Todaylist extends Component {
    componentWillMount() {
        console.log(this.props.match.params.word)
        // const {history} = this.props;
        // if(!!this.props.word){
            
        //     // history.go(-1)
        // }else{
        //     console.log("21312")
        //     history.push("/app/classify")
        // }
    }
    render() {
        const { today } = this.props
        const word = this.props.match.params.word
            return (
                <div>
                    <Head title={word} show={true}></Head>
                    <div className="todolist">
                    {
                        today[0].results[word].map((item, i) => {
                            return (
                                <WingBlank key={i}>
                                <a href={item.url} key={i}>
                                        <List className="my-list">
                                            <Item arrow="horizontal" multipleLine onClick={() => { }}>
                                                {item.desc} <Brief><i className="iconfont icon-ren"></i>{item.who}　<i className="iconfont icon-sj"></i>{item.publishedAt.split("T")[0]} <i className="iconfont icon-biaoqian"></i>{item.type}</Brief>
                                            </Item>
                                        </List>
                                    </a>
                                     </WingBlank>
                            )
                        })
                    }
                    </div>
                </div>
            )
        
        
    }
}