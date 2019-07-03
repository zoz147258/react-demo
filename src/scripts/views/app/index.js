
import "./index.scss"
import {Route,Switch,Redirect} from "react-router-dom"
import { Home } from "../home";
import { Classify } from "../classify";
import { Mine } from "../mine";
import { Foot } from "../../components/foot";


export class App extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/app/home" component={Home}/>
                    <Route path="/app/classify" component={Classify}/>
                    <Route path="/app/mine" component={Mine}/>
                    <Route render={
                        ()=>(<Redirect to="/app/classify"/>)
                    }/>
                </Switch>
                <Foot/>
            </div>
        )
    }
}