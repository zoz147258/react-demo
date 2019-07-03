
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { Login } from "./login";
import { App } from "./app";
import { Guide } from "./guidu";
import { Search } from "./search";
import Article from "./Article/Article.jsx";
import Comment from "./Comment/Comment.jsx";
import { Todaylist } from "./todaylist";
import { Liuyan } from "./liuyan";
import { Saoyisao } from "./saoyisao";


export class IndexView extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="" exact component={Layout}/>
                </div>
            </Router>
        )
    }
}

export class Layout extends Component {
    render() {
        return (
            <Switch>
                <Route path="/guide" component={Guide}/>
                <Route path="/search" component={Search}/>
                <Route path="/app/" strtic component={App}/>
                <Route path="/todaylist/:word" strtic component={Todaylist}/>
                <Route path="/article/:id" component={Article}></Route>
                <Route path="/liuyan/:key" component={Liuyan}></Route>
                <Route path="/comment/:id" component={Comment}></Route>
                <Route path="/login" component={Login}/>
                <Route path="/saoyisao" component={Saoyisao}/>
                <Route render={
                    ()=>(<Redirect to="/guide"/>)
                }/>
            </Switch>
        )
    }
}
