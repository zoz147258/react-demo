import "./index.scss"

import { Head } from "../../components/head";
import TodoList from "../../components/todolist";
import {PullToRefresh } from "antd-mobile"


export class Liuyan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
        };
    }
    render() {
        console.log(this.props)
        const _id=this.props.match.params.key
        return (
            <div>
                <Head title="留言" show={true}></Head>
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
                <TodoList _id={_id} />
                </PullToRefresh>
            </div>
        )
    }
}