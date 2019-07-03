
import "./index.scss"
import { Head } from "../../components/head";
import { Link } from "react-router-dom"
import { WingBlank, WhiteSpace, Carousel, PullToRefresh } from "antd-mobile"
import { connect } from "react-redux"
import ArticleList from '../ArticleList/ArticleList.jsx';
import { getBanner } from "../../actions";



@connect(
    state => {
        console.log(state)
        return {
            ...state.banner
        }
    }
)
export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
        };
    }

    componentWillMount() {
        // const { dispatch } = this.props
        // dispatch(getBanner({
        //     url: "https://zhihu-daily.leanapp.cn/api/v1/last-stories",
        //     cb() { }
        // }))
    }


    render() {
        console.log(this.props.banner)
        return (
            <div>
                <Head title="首页" ></Head>

                <WingBlank className="shouye">
                    <PullToRefresh
                        damping={70}
                        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                        direction={this.state.down ? 'down' : 'up'}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true });
                            setTimeout(() => {
                                this.setState({ refreshing: false });
                            }, 1000);
                        }}
                    >
                        <Carousel
                            autoplay={false}
                            infinite
                            className="carousel"
                            autoplay={true}
                        >
                            {
                                // this.props.banner.map((item, i) => {
                                //     return (
                                //         <Link
                                //             className="move-in"
                                //             to={`/article/${item.id}`}
                                //             key={i}
                                //             style={{ display: 'inline-block', width: '100%', height: 270 }}
                                //         >
                                //             <img
                                //                 src={item.image}
                                //                 className="bannerimage"
                                //                 alt=""
                                //                 style={{ width: '100%', verticalAlign: 'top', height: 270 }}
                                //                 onLoad={() => {

                                //                     window.dispatchEvent(new Event('resize'));

                                //                 }}
                                //             />
                                //             <span className="bannertitle">{item.title}</span>
                                //             <div className="bannermask"></div>
                                //         </Link>
                                //     )
                                // })
                            }
                        </Carousel>
                        <ArticleList />
                    </PullToRefresh>
                </WingBlank>

            </div>
        )
    }
}