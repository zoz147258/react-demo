

import "./index.scss"

import { Head } from "~/components/head"
import { WingBlank, WhiteSpace, SearchBar, List, PullToRefresh } from "antd-mobile";
import axios from "@/utils/axios"
import { connect } from "react-redux"
import { searchList } from "../../actions";


const Item = List.Item;
const Brief = Item.Brief;


@connect(
    state => {
        console.log(state)
        return {
            ...state.data
        }
    }
)
export class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
        };
    }


    state = {
        goods: []
    }
    getSearch = () => {
        console.log(this.word.state.value);
        const { dispatch } = this.props
        dispatch(searchList({
            url: "/react/menulist",
            params: { keyword: this.word.state.value },
            cb() { }
        }))
    }


    render() {
        console.log(this.props.menulist);
        const { menulist } = this.props;
        return (
            <div>
                <Head title="搜索" show={true} ></Head>
                <WingBlank>
                    <WhiteSpace />
                    <SearchBar ref={el => this.word = el} placeholder="Search" maxLength={8} onBlur={this.getSearch} />
                </WingBlank>
                <PullToRefresh
                    damping={70}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({ refreshing: true });
                        menulist.reverse()
                        setTimeout(() => {
                            this.setState({ refreshing: false });
                            // menutypes.reverse()
                        }, 1000);
                    }}
                >
                    {
                        menulist.map((item, i) => {
                            return (
                                <WingBlank key={i} className="move-in">
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
                </PullToRefresh>
            </div>
        )
    }
}