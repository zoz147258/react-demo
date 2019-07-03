
import "./index.scss"
import { Head } from "../../components/head";
import { Button, Toast } from "antd-mobile"
import axios from "@/utils/axios"


var shares = null;


export class Mine extends Component {
    state = {
        isLogin: false
    }

    constructor(...args) {
        super(...args);
        this.state = {
            show: false,
            userImg: require('@/assets/images/Pikachu.jpg'),
        };
    }

    goLogin = () => {
        const { history } = this.props;
        history.push("/login");
    }

    exit = () => {
        const { history } = this.props;
        history.push("/login");
        sessionStorage.userInfo = ""
    }

    componentWillMount = () => {

        console.log(localStorage.userInfo);
        console.log(sessionStorage.userInfo)
        console.log(sessionStorage._id)

        // const obj = {
        //     _id: JSON.parse(sessionStorage.userInfo)._id
        // }
        // console.log(obj)


        // if (sessionStorage.userInfo) {
        //     this.setState({
        //         isLogin: true,
        //         userImg: JSON.parse(sessionStorage.userInfo).avatar.replace(/public/, 'http://localhost:1901'),
        //     })
        // }

        // axios.get("/react/getuserinfo", {
        //     params: obj
        // }).then(res => {
        //     console.log(res.data.result);
        //     this.setState({
        //         userImg: res.data.result.avatar.replace(/public/, 'http://localhost:1901'),
        //     })
        // })
        setTimeout(() => {
            console.log(sessionStorage.avatar)
            if (sessionStorage.userInfo) {
                this.setState({
                    isLogin: true,
                })
                if(sessionStorage.avatar){
                    this.setState({
                        userImg:sessionStorage.avatar.replace(/public/, 'http://47.101.135.246:1901'),
                    })
                }else{
                    this.setState({
                        userImg:require('@/assets/images/Pikachu.jpg'),
                    })
                }
            } else {
                localStorage.userInfo = ""
                const { history } = this.props;
                history.push("/login");
                Toast.info('请先登入!!!', 1);
            }
        }, 10);

        // if (sessionStorage.userInfo) {
        //     this.setState({
        //         isLogin: true,
        //         userImg: JSON.parse(sessionStorage.userInfo).avatar.replace(/public/, 'http://localhost:1901'),
        //     })
        // } else {
        //     localStorage.userInfo = ""
        //     const { history } = this.props;
        //     history.push("/login");
        //     Toast.info('请先登入!!!', 1);
        // }
        // if (localStorage.userInfo) {
        //     this.setState({
        //         userImg: JSON.parse(localStorage.userInfo).avatar.replace(/public/, 'http://localhost:1901'),
        //     })
        // }
    };


    //拍照
    takePhoto = () => {
        var cmr = plus.camera.getCamera();
        var res = cmr.supportedImageResolutions[0];
        var fmt = cmr.supportedImageFormats[0];
        console.log("Resolution: " + res + ", Format: " + fmt);
        cmr.captureImage(function (path) {
            //					alert( "Capture image success: " + path );  
            var pic = document.getElementById("pic")

            plus.io.resolveLocalFileSystemURL(path, function (entry) {
                pic.src = entry.toLocalURL();
            }, function (e) {
                outLine('读取拍照文件错误：' + e.message);
            });
        },
            function (error) {
                //					alert( "Capture image failed: " + error.message );
            },
            { resolution: res, format: fmt }
        );
    }


    //分享
    getShares=()=>{
        plus.share.getServices(function(s){
         shares = s;
         console.log(JSON.stringify(shares));
     }, function(e){
         alert("获取分享服务列表失败："+e.message);
     });
    }

    openSharesList = () => {
        mui('#sheet1').popover('toggle');
    }

    shareTo = (id) => {
        
        for (var i in shares) {
            console.log(shares)
            if (shares[i].id == id) {
                var s = shares[i];
                s.authorize(function () {
                    console.log("认证完成！");
                    s.send({ content: "Hello" }, function () {
                        alert("分享成功！");
                    }, function (e) {
                        alert("分享失败：" + e.message);
                    });
                }, function (e) {
                    console.log("未进行认证");
                })
            }
        }
    }

    shareSystem = () => {
        plus.share.sendWithSystem({ content: 'wuhan1901 2周全部就业 ！！！' }, function () {
            console.log('分享成功');
        }, function (e) {
            console.log('分享失败：' + JSON.stringify(e));
        });
    }
    //获得slider插件对象


    onChange = (e) => {
        let $target = e.target || e.srcElement
        console.log(15115165)
        let mobile = JSON.parse(sessionStorage.userInfo).mobile
        console.log(mobile)
        let file = $target.files[0];
        let data = new FormData();    // 构建表单数据对象  
        data.append('avatar', file);  // 需要上传到 服务器 的数据
        data.append('mobile', mobile);
        const instance = axios.create({
            withCredentials: true
        })
        instance.post('/react/upload-avatar', data).then(res => {
            this.setState({
                userImg: res.data.imgUrl.replace(/public/, 'http://47.101.135.246:1901')
            })
            console.log(res.data)
            sessionStorage.avatar = res.data.imgUrl;
            // console.log(localStorage.userInfo)
        })
    };

    yijian=()=>{
        Toast.info('这边不接受宁的意见呢', 1);
    }
    dashang=()=>{
        Toast.info('已收到打赏，ヾ(￣▽￣)Bye~Bye~', 1);
    }
    me=()=>{
        Toast.info('他是你，也是我，是每个人摘下面具后最真实的自己。我们嘲笑刘波是一个傻子，到头来，只是在笑我们自己罢了。 也许根本就没有刘波，或者人人都是刘波。', 2);
    }

    gosaoyisao=()=>{
        const { history } = this.props
        history.push("/saoyisao");
    }

    render() {
        const {
            isLogin
        } = this.state;
        console.log(isLogin)
        // console.log(JSON.parse(sessionStorage.userInfo))
        const usertel = sessionStorage.userInfo && JSON.parse(sessionStorage.userInfo).mobile
        return (
            <div>
                <Head title="个人中心"></Head>

                {/* <div style={{ display: isLogin ? 'block' : 'none' }} >
                    <h2> 你的账户  ==  {13212341234}</h2>
                    <img src={require("@/assets/images/photo.png")} alt="" />
                </div> */}
                <div className='upload-container'>
                    <img className="aui-head-body" src={require('@/assets/images/head.png')} alt="" />
                    <h2 className="nikoname">{usertel}</h2>
                    <input type="file" name="image" className='headerInput' onChange={this.onChange} />
                    <img src={this.state.userImg} alt="" id='userHeader' className='headerImg' />
                    <Button className="top-user" style={{ display: !isLogin ? 'block' : 'none' }} onClick={this.goLogin}>立即登录</Button>
                    <Button className="top-use" type="warning" style={{ display: !isLogin ? 'none' : 'block' }} onClick={this.exit}>立即退出</Button>
                </div>
                <div className="aui-palace">
                    <div className="aui-palace-grid">
                        <div className="aui-palace-grid-icon" onClick={this.gosaoyisao}>
                            <img src={require('@/assets/images/icon-head-001.png')} alt="" />
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>扫一扫</h2>
                        </div>
                    </div>
                    <div className="aui-palace-grid" onClick={this.openSharesList}>
                        <div className="aui-palace-grid-icon">
                            <img src={require('@/assets/images/icon-head-002.png')} alt="" />
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>分享好友</h2>
                        </div>
                    </div>
                    <div className="aui-palace-grid" onClick={this.shareSystem}>
                        <div className="aui-palace-grid-icon">
                            <img src={require('@/assets/images/icon-head-003.png')} alt="" />
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>分享本地</h2>
                        </div>
                    </div>
                    <div className="aui-palace-grid">
                        <div className="aui-palace-grid-icon">

                            <img src={require('@/assets/images/icon-head-004.png')} alt="" />
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>联系客服</h2>
                        </div>
                    </div>
                    <div className="aui-palace-grid" onClick={this.takePhoto}>
                        <div className="aui-palace-grid-icon">
                            <img src={require('@/assets/images/icon-head-005.png')} alt="" />
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>评价拍照</h2>
                        </div>
                    </div>
                    <div className="aui-palace-grid" >
                        <div className="aui-palace-grid-icon">
                            <img src={require('@/assets/images/icon-head-006.png')} alt="" />
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>商旅合作</h2>
                        </div>
                    </div>
                </div>
                <div className="aui-landlady">
                    <h2>广告位招租</h2>
                </div>
                <div className="aui-landlady mine">
                    <div className="aui-flex" onClick={this.openSharesList}>
                        <div className="aui-flex-box">
                            <h3>向朋友推荐</h3>
                        </div>

                        <div className="aui-arrow">

                            <p></p>

                        </div>
                    </div>
                    <div className="aui-flex" onClick={this.yijian}>
                        <div className="aui-flex-box">
                            <h3>意见反馈</h3>
                        </div>
                        <div className="aui-arrow">
                            <p></p>
                        </div>
                    </div>
                    <div className="aui-flex" onClick={this.dashang}>
                        <div className="aui-flex-box" >
                            <h3>喜欢我们，就打赏鼓励一下</h3>
                        </div>
                        <div className="aui-arrow">
                            <p></p>
                        </div>
                    </div>
                    <div className="aui-flex" onClick={this.me}>
                        <div className="aui-flex-box">
                            <h3>关于我们</h3>
                        </div>
                        <div className="aui-arrow">
                            <p></p>
                        </div>
                    </div>
                </div>
                <div id="sheet1" className="mui-popover mui-popover-bottom mui-popover-action ">
                    {/* <!-- 可选择菜单 --> */}
                    <ul className="mui-table-view">
                        <li className="mui-table-view-cell">
                            <a onClick={() => this.shareTo('qq')}>分享QQ</a>
                        </li>
                        <li className="mui-table-view-cell">
                            <a onClick={() => this.shareTo('weixin')}>分享Wechat</a>
                        </li>
                        <li className="mui-table-view-cell">
                            <a onClick={() => this.shareTo('sinaweibo')}>分享Weibo</a>
                        </li>
                    </ul>
                    {/* <!-- 取消菜单 --> */}
                    <ul className="mui-table-view">
                        <li className="mui-table-view-cell">
                            <a href="#sheet1"><b>取消</b></a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}