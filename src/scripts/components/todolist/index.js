

// 留言板 
import "./index.scss"

import { Button, WhiteSpace,WingBlank, NoticeBar, InputItem, List, Toast } from "antd-mobile"

import { connect } from "react-redux"
import { getMenuTitle } from "../../actions";
import axios from "@/utils/axios"

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
export default class TodoList3 extends Component {
    state = {
        comments: [],
        title: ""
    }

    componentWillMount() {
        console.log(this.props)
        const idx = this.props._id
        const obj = {
            idx: this.props._id
        }
        const { dispatch } = this.props
        dispatch(getMenuTitle({
            url: "/react/getmenutitle",
            params: {
                idx
            },
            cb() { }
        }))
        // console.log(obj)
        // axios.get("/react/getmenutitle",{params:obj}).then(res => {
        //     console.log(res)
        //     this.setState({
        //         title: res.data.result
        //     })
        //     Toast.loading(res.data.msg, 0.4);
        // })

        axios.get("/react/liuyan",{params:obj}).then(res => {
            console.log(res)
            this.setState({
                comments: res.data.result
            })
            Toast.loading(res.data.msg, 0.4);
        })
    }


    delComment = (i) => {
        
        var self = document.getElementById(i);
        var parent = self.parentElement;
        setTimeout(() => {
            parent.removeChild(self);
        }, 900);    
        console.log(self)
        console.log(parent)
        console.log(i)
        // this.state.comments.splice(i, 1);
        
        // this.setState({
        //     comments: this.state.comments
        // })




    };
    addComment = (result) => {

        this.setState({
            comments: result,

        })
    }
    render() {
        console.log(this.state.comments)
        return (
            <div className="todolist">
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    {this.props.menutitle.desc}
                </NoticeBar>

                <ShowMsgCom comments={this.state.comments} delComment={this.delComment} ></ShowMsgCom>
                <PostMsgCom idx={this.props._id} addComment={this.addComment}></PostMsgCom>
            </div>
        )
    }
}

@connect(
    state => {
        console.log(state)
        return {
            ...state.data
        }
    }
)
class ShowMsgCom extends Component {

    del(i, idx) {
        const { delComment } = this.props;
        var item = "aaa" + i
        console.log(idx)
        var flag = confirm('宁确定要删除我么！')
        if (flag) {
            document.getElementById(item).className = "am-list-item move-out am-list-item-middle";
            axios.get("/react/delliuyan", {
                params: {
                    _id: idx
                }
            }).then(res => {
                console.log(res)
                delComment(item);
                setTimeout(() => {
                    
                    document.getElementById(item).className = "am-list-item  am-list-item-middle"
                }, 900);
                Toast.loading(res.data.msg, 0.4);
            })

        }
    }

    render() {
        console.log(this.props)
        const {menutitle}=this.props

        const date=menutitle.publishedAt&&menutitle.publishedAt.split("T")[0]
        return (
            <div>
                    <a href={menutitle.url} >
                        <List className="my-list">
                            <Item arrow="horizontal" multipleLine onClick={() => { }}>
                                {menutitle.desc} <Brief><i className="iconfont icon-ren"></i>{menutitle.who}　<i className="iconfont icon-sj"></i>{date} <i className="iconfont icon-biaoqian"></i>{menutitle.type}</Brief>
                            </Item>
                        </List>
                    </a>



                <List renderHeader={() => '展示评论'} style={{ 'margin': '10px' }}>
                    {
                        this.props.comments.map((items, i) => {

                            return (
                                <Item key={i} id={"aaa" + i} extra={items.content} onClick={() => this.del(i, items._id)}>{items.title} </Item>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}

class PostMsgCom extends Component {
    change = () => {
        const { addComment, idx } = this.props;
        console.log(this.props)
        var title = this.refs.title.state.value;
        var content = this.refs.content.state.value;
        axios.post("/react/addliuyan", {
            title, content, idx
        }).then(res => {
            console.log(res)
            this.refs.title.state.value = ""
            this.refs.content.state.value = ""
            addComment(res.data.result)

        })


    }

    render() {
        return (
            <div>
                <InputItem
                    clear
                    placeholder="请输入标题"
                    ref="title"
                >标题</InputItem>
                <InputItem
                    clear
                    placeholder="请输入内容"
                    ref="content"
                >内容</InputItem>
                <Button type="primary" onClick={this.change}>提交留言</Button> <WhiteSpace />
            </div>

        )
    }
}