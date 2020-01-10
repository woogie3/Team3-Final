import React from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class QnAInsert extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state={
            user_id: '',
            QnA_title: '',
            QnA_content: '',
            completed: 0

        };
        this.handleFormsubmit = this.handleFormsubmit.bind(this)
        //this.QnAInsert = this.QnAInsert.bind(this)
        this.stateRefresh = this.stateRefresh.bind(this)
    }
    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            user_id: decoded.user_id
        })
    }
    stateRefresh() {
        this.setState({
            user_id: '',
            QnA_title: '',
            QnA_content: '',
            completed: 0
        });
        this.callApi()
        .then(res => this.setState({QNAS: res}))
        .catch(err => console.log(err))
    }

    handleFormsubmit = (e) => {
        e.preventDefault()
       this.axios();
       this.props.history.push('/QNA');
        this.setState({
            user_id: '',
            QnA_title: '',
            QnA_content: '',

        })
    }
    handleValueChange=(e)=> {
        console.log(11)
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        console.log(nextState);
        this.setState(nextState);
    }

    axios = async () =>{
        var params = new URLSearchParams();
        params.append('QnA_title', this.state.QnA_title)
        params.append('QnA_content', this.state.QnA_content)
        params.append('user_id', this.state.user_id)
        await axios.post('/api/QNAS', params)
        .then((Response) => {
         console.log(Response);   
        }).catch((ex)=>{
         console.log(ex);
        })
        
    }

    render() {
        console.log(this.state.QnA_id)
        return (
            <div className="col-md-6 mt-5 mx-auto">
            <form stateRefresh={this.stateRefresh} onSubmit={this.handleFormsubmit}>
                <h1 className="h3-mb-3 font-weight-normal text-center">QNA문의하기</h1>
                <div className="form-group">
                <label className="font-weight-bold" htmlFor="text">제목</label>
                <input className="form-control" type="text" name="QnA_title" values={this.state.QnA_title} onChange={this.handleValueChange} /> <br />
                </div>
                <div className="form-group">
                <label className="font-weight-bold" htmlFor="text">내용</label>
                <textarea className="form-control qna-textarea" type="text" name="QnA_content" values={this.state.QnA_content} onChange={this.handleValueChange} /> <br />
                </div>
                <button className="btn btn-lg btn-dark btn-block" type="submit" >글쓰기</button>
            </form>
            </div>
        )
    }
}

export default QnAInsert;