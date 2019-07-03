
import "./index.scss"
import Swipe from "@/scripts/components/swipe"

const Item = Swipe.item;
export class Guide extends Component {
    state = {
        images: [
            require("@/assets/images/slide1.png"),
            require("@/assets/images/slide2.png"),
            require("@/assets/images/slide3.png"),
            require("@/assets/images/slide4.png"),
        ]
    }
    goApp(i) {
        const { history } = this.props
        if (i == this.state.images.length - 1) {
            history.push("/app/classify")
        }
    }

    componentWillMount() {
        if (localStorage.count) {
            localStorage.count++
            if (localStorage.count >= 4) {
                const { history } = this.props
                history.push("/app/classify")
            }
        } else {
            localStorage.count = 1
        }
    }

    render() {
        return (

            <Swipe id="guide" options={{ loop: false }}>
                {
                    this.state.images.map((item, i) => {
                        return (
                            <Item key={i}>
                                <img src={item} alt="" className="g-img" onClick={() => this.goApp(i)} />
                            </Item>
                        )
                    })
                }
            </Swipe>
        )
    }
}