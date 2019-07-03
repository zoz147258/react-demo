
import axios from 'axios';
import './Comment.scss';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        longComment: [],
        shortComment: [],
        iconLongStyleName: 'iconfont icon-hover-up',
        showLongComment: 'block',
        iconShortStyleName: 'iconfont icon-hover-down',
        showShortComment: 'none'
      }
      // 定义的事件内使用 this 之前，需要先绑定 this
      // this.toggleIconName = this.toggleIconName.bind(this);
      this.back = this.back.bind(this);
  }

  componentWillMount() {
    console.log("23123")
    axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/' + this.props.match.params.id + '/long-comments').then((res) => {
      this.setState({ longComment: res.data.COMMENTS.comments });
      // console.log(this.state.longComment);
    });
    axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/' + this.props.match.params.id + '/short-comments').then((res) => {
      this.setState({ shortComment: res.data.COMMENTS.comments });
    });
  }

  toggleIconName(index) {
    if (index === 'long') {
      if (this.state.iconLongStyleName === 'iconfont icon-hover-up') {
        this.setState({ iconLongStyleName: 'iconfont icon-hover-down' });
        this.setState({ showLongComment: 'none' });
      } else {
        this.setState({ iconLongStyleName: 'iconfont icon-hover-up' });
        this.setState({ showLongComment: 'block' });
      }
    } else {
			if (this.state.iconShortStyleName === 'iconfont icon-hover-up') {
        this.setState({ iconShortStyleName: 'iconfont icon-hover-down' });
        this.setState({ showShortComment: 'none' });
      } else {
        this.setState({ iconShortStyleName: 'iconfont icon-hover-up' });
        this.setState({ showShortComment: 'block' });
      }
    }
  }

  back() {
    this.props.history.goBack();
  }

  render() {

    const renderLongComment = this.state.longComment.map((item, index) => {
      return (
        <div style={{"display":this.state.showLongComment}} key={index}>
					<div className="comment-content">
            <div className="author">
              <div className="avatar">
                <img className="image" src={item.avatar} alt="avatar" />
              </div>
              <span className="name">{item.author}</span>
              <div className="favour">
                <i className="icon-favour"></i>
                <span className="likes">{item.likes}</span>
              </div>
            </div>
            <div className="comment-text">
              <span className="long-text">{item.content}</span>
              <span className="time">{}</span>
            </div>
          </div>
				</div>
      );
    });

    const renderShortComment = this.state.shortComment.map((item, index) => {
      return (
        <div style={{"display":this.state.showShortComment}} key={index}>
					<div className="comment-content">
            <div className="author">
              <div className="avatar">
                <img className="image" src={item.avatar} alt="avatar" />
              </div>
              <span className="name">{item.author}</span>
              <div className="favour">
                <i className="icon-favour"></i>
                <span className="likes">{item.likes}</span>
              </div>
            </div>
            <div className="comment-text">
              <span className="short-text">{item.content}</span>
              <span className="time">{}</span>
            </div>
          </div>
				</div>
      );
    });

    return (
      <div className="comment">
      	<header className="header">
      		<div onClick={this.back} className="back">
		        <i className="iconfont icon-fanhui"></i>
		      </div>
		      <div className="edit">
		        <span className="text">{this.state.longComment.length + this.state.shortComment.length} 条点评</span>
		        <i className="icon-edit"></i>
		      </div>
      	</header>
      	<div className="comment-list">
      		<div className="long-comment">
	      		<div onClick={this.toggleIconName.bind(this, 'long')} className="long-comment-header">
	      			<span className="text">{this.state.longComment.length} 条长评</span>
	      			<i className={this.state.iconLongStyleName}></i>
	      		</div>	        	 
	        	{renderLongComment}
	      	</div>
	      	<div className="short-comment">
		      	<div onClick={this.toggleIconName.bind(this, 'short')} className="long-comment-header">
	      			<span className="text">{this.state.shortComment.length} 条短评</span>
	      			<i className={this.state.iconShortStyleName}></i>
	      		</div>	        	 
	        	{renderShortComment}      
	      	</div>
      	</div>
      </div>
    )
  }
}
