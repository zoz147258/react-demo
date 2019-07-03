
import "./index.scss"
import { Head } from "../../components/head";
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { menuTypes, todayType } from "../../actions";
import { WingBlank, WhiteSpace, List, Flex, Button,PullToRefresh } from "antd-mobile"



const Item = List.Item;
const Brief = Item.Brief;

@connect(
    state => {
        console.log(state)
        return {
            ...state.data,
            ...state.today
        }
    }
)
export class Classify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
        };
    }

    componentWillMount() {
        const { dispatch } = this.props
        dispatch(menuTypes({
            url: "/react/getmenuall",
            cb() { }
        }))
    }

    golist = (val) => {
        console.log(val)
        // const { dispatch } = this.props
        // dispatch(todayType({
        //     word: val,
        //     cb() {}
        // }))

        const { history } = this.props;
        history.push("/todaylist/" + val)
    }
    render() {

        const { menutypes, types, today } = this.props

        // const data = types[0].results.map((_val, i) => ({
        //     icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        //     text: _val.title,
        // }));
        // let tabs = today[0].category.map(item => ({
        //     title:item
        // }))
        console.log(today[0].results)

        return (
            <div>
                <Head title="商品分类"></Head>
                <Flex wrap="wrap" justify="between" className="fenlei">
                    {
                        today[0].category.map((t, i) => {
                            return (
                                <Button type="warning" key={i} className="inline" inline size="small" onClick={() => this.golist(t)} >{t}</Button>
                            )
                        })
                    }

                </Flex>
                <div className="classify">
                    <PullToRefresh
                        damping={70}
                        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                        direction={this.state.down ? 'down' : 'up'}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true });
                            menutypes.reverse()
                            setTimeout(() => {
                                this.setState({ refreshing: false });
                                // menutypes.reverse()
                            }, 1000);
                        }}
                    >
                        {
                            menutypes.map((item, i) => {
                                // console.log(item)
                                return (
                                    <WingBlank key={i} className="move-in">
                                        {/* <a href={item.url}> */}
                                        <Link to={`/liuyan/${item._id}`}>
                                            <List className="my-list" >
                                                <Item arrow="horizontal" multipleLine onClick={() => { }}>
                                                    {item.desc} <Brief><i className="iconfont icon-ren"></i>{item.who}　<i className="iconfont icon-sj"></i>{item.publishedAt.split("T")[0]} <i className="iconfont icon-biaoqian"></i>{item.type}</Brief>
                                                </Item>
                                            </List>
                                        </Link>
                                        {/* </a> */}
                                    </WingBlank>
                                )
                            })
                        }
                    </PullToRefresh>
                </div>





            </div>
        )
    }
}