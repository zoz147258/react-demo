
import "./index.scss"
import { Head } from "../../components/head";
export class Saoyisao extends Component {

    componentWillMount(){
        document.addEventListener("plusready",function(){
            startScan();
        },false);
        function startScan(){
            scan = new plus.barcode.Barcode('bcid');
            scan.start();
            scan.onmarked = function(type,result){
                var text = '未知: ';
                switch(type){
                    case plus.barcode.QR:
                    text = 'QR: ';
                    break;
                    case plus.barcode.EAN13:
                    text = 'EAN13: ';
                    break;
                    case plus.barcode.EAN8:
                    text = 'EAN8: ';
                    break;
                }
                alert( text+result );
//					location.href =
                mui.openWindow({
                    url:result
                })
            }
        }
    }
    render() {
        return (
            <div>
                <Head title="扫一扫" show={true}></Head>
                <div id="bcid">

                </div>
            </div>
        )
    }
}