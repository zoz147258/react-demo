

import "./index.scss";

import { Head } from "../../components/head"
import { WingBlank, WhiteSpace, Toast, List, InputItem, Button } from "antd-mobile";
import axios from "@/utils/axios"
import bg from "@/assets/images/bg.png"//图片相对路径

export const mobileReg = /^1(3|5|7|8|9)\d{9}$/
export const codeReg = /^\d{4}$/

let timer = null;
export class Login extends Component {
    state = {
        toggle: true,
        mobileDis: true,
        flag: true,
        count: 60,
        txt: "获取验证码"
    }
    checkMobile = (mobile) => {
        console.log(mobile);
        // if(mobileReg.test(mobile)){
        //     this.setState({
        //         mobileDis:false
        //     })
        // }else{
        //     this.setState({
        //         mobileDis:true
        //     })
        // }
        if (this.state.flag) {
            this.setState({
                mobileDis: !mobileReg.test(mobile)
            })
        }
    }

    startTime = () => {
        console.log('uuu')
        timer = setInterval(() => {
            if (this.state.count > 0) {
                this.setState({
                    count: --this.state.count,
                    txt: this.state.count + ' s 后继续'
                })

            } else {
                clearInterval(timer);
                timer = null;
                this.setState({
                    txt: "获取验证码",
                    mobileDis: false,
                    flag: true,
                    count: 60
                })
            }
        }, 1000)
    }

    getCode = () => {
        axios.post("/react/sendCode", {
            mobile: this.refs.mobile.state.value
        }).then(res => {
            console.log(res)
        })

        this.setState({
            mobileDis: true,
            flag: false
        })
        // ajax 
        this.startTime();
    }


    checkCode = (val) => {
        var mobile = this.refs.mobile.state.value;
        this.setState({
            toggle: !(codeReg.test(val) && mobileReg.test(mobile))
        })
    }

    autoLogin = () => {
        var mobile = this.refs.mobile.state.value;
        var code = this.refs.code.state.value;
        axios.post("/react/testCode", {
            mobile, code
        }).then(res => {
            console.log(res);
            if (!!res.data.type) {
                this.props.history.push("/app/mine");
                // var userInfo = {
                //     token: res.data.token
                // }
                sessionStorage.userInfo = JSON.stringify(res.data.result)
                sessionStorage.avatar = res.data.result.avatar ;
                // sessionStorage._id=res.data.result._id
            } else {
                delete sessionStorage['userInfo']
            }
        })
    }


    authLogin(id){
        alert("auths");
        for(var s in auths){
            if(auths[s].id==id){
                var obj = auths[s];
                obj.login(function(e){
                 plus.nativeUI.alert("登录认证成功!");
                 obj.getUserInfo( function(e){
                     plus.nativeUI.alert("获取用户信息成功："+JSON.stringify(obj.userInfo));
                     sessionStorage.userInfo = JSON.stringify(obj.userInfo)
                 }, function(e){
                     plus.nativeUI.alert("获取用户信息失败： "+JSON.stringify(e));
                 } );
             }, function(e){
                 plus.nativeUI.alert("登录认证失败: "+JSON.stringify(e));
             } );
            }
        }
    }
    goback=()=>{
        this.props.history.go(-1);
    }

    register=()=>{
        Toast.info('手机号登入不用注册!', 1);
    }
    password=()=>{
        Toast.info('手机号登入哪来的密码?', 1);
    }


    render() {
        const {
            toggle,
            mobileDis,
            txt
        } = this.state
        return (
            <div className="baby" style={{ backgroundImage: `url(${bg})` }}>
                {/* <Head title="登录" show={true} ></Head>
                
                <WingBlank className="login">
                <List>
                    <WhiteSpace/>
                    <InputItem
                        ref="mobile"
                        type="tel"
                        placeholder="请输入手机号"
                        clear
                        onChange={this.checkMobile}
                    >手机号</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        ref="code"
                        type="tel"
                        placeholder="请输入验证码"
                        clear
                        onChange={this.checkCode}
                    >验证码</InputItem>
                    <WhiteSpace/>
                    <Button className="l-btn" ref="btn" type="warning" onClick={this.getCode} disabled={mobileDis} > {txt}</Button>
                    <WhiteSpace/>
                    <Button type="primary" disabled={toggle} onClick={this.autoLogin}>马上登录</Button>
                    </List>
                </WingBlank> */}
                <div className="aui-flexView">
                    <header className="aui-navBar aui-navBar-fixed">
                        <a href="javascript:;" className="aui-navBar-item" onClick={this.goback}>
                            <i className="iconfont icon-fanhui"></i>
                        </a>
                    </header>
                    <div className="aui-scrollView">

                        <div className="aui-account-title">
                            <h1>账号登录</h1>
                        </div>

                        <div className="aui-account-input">
                            <div className="b-line">
                                <WingBlank>
                                    <WhiteSpace />
                                    <InputItem
                                        ref="mobile"
                                        type="tel"
                                        placeholder="请输入手机号"
                                        clear
                                        onChange={this.checkMobile}
                                    >手机号</InputItem>
                                </WingBlank>
                            </div>
                            <div className="c-line">
                                <WingBlank>
                                    <InputItem
                                        ref="code"
                                        type="tel"
                                        placeholder="请输入验证码"
                                        clear
                                        onChange={this.checkCode}
                                    >验证码</InputItem>
                                    <Button className="l-btn" ref="btn" type="warning" onClick={this.getCode} disabled={mobileDis} > {txt}</Button>
                                </WingBlank>
                            </div>
                        </div>
                        <div className="aui-account-button">
                            <button id="login_submit" disabled={toggle} onClick={this.autoLogin}>登录</button>
                        </div>
                        <div className="aui-account-link">
                            <a href="javascript:;" onClick={this.register}>注册账号</a>&nbsp;&nbsp;&nbsp;&nbsp;
			<a href="javascript:;" onClick={this.password}>忘记密码</a>
                        </div>

                        <div className="aui-account-footer">
                            <div className="aui-account-footer-title">
                                <h2>其它登录方式</h2>
                            </div>
                            <div className="aui-palaces">
                                <a href="javascript:;" className="aui-palace-grid" onClick={()=>this.authLogin("weixi")}>
                                    <div className="aui-palace-grid-icon">
                                        <img src={require('@/assets/images/wx.png')} alt="" />
                                    </div>
                                    <div className="aui-palace-grid-text">
                                        <h2>微信</h2>
                                    </div>
                                </a>
                                <a href="javascript:;" className="aui-palace-grid" onClick={()=>this.authLogin("weibo")}>
                                    <div className="aui-palace-grid-icon">
                                        <img src={require('@/assets/images/wb.png')} alt="" />
                                    </div>
                                    <div className="aui-palace-grid-text">
                                        <h2>微博</h2>
                                    </div>
                                </a>
                                <a href="javascript:;" className="aui-palace-grid" onClick={()=>this.authLogin("qq")}>
                                    <div className="aui-palace-grid-icon">
                                        <img src={require('@/assets/images/qq.png')} alt="" />
                                    </div>
                                    <div className="aui-palace-grid-text">
                                        <h2>QQ</h2>
                                    </div>
                                </a>
                            </div>
                        </div>


                    </div>
                </div>

            </div>


        )
    }
}