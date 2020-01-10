import React from 'react'
import jwt_decode from 'jwt-decode';

import axios from 'axios';
import { withRouter } from 'react-router-dom';
import HeaderMenu from '../components/HeaderMenu';

class QnAInsert extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        console.log(props.match.params)

        // let a = props.location.pathname;
        // let g = a.split;
        // console.log(a)
        this.state={
            QnA_id: '',
            user_id: '',
            QnA_title: '',
            QnA_content: '',
            QnA_date: '',
            QnA_views: '',
            // QNAS: '',
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
        let a = this.props.location.state.id;
        console.log(a);
    }

    stateRefresh() {
        this.setState({
            QnA_id: '',
            user_id: '',
            QnA_title: '',
            QnA_content: '',
            QnA_date: '',
            QnA_views: '',
            // QNAS: '',
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
            QnA_id: '',
            user_id: '',
            QnA_title: '',
            QnA_content: '',
            QnA_date: '',
            QnA_views: ''

        })
    }
    handleValueChange=(e)=> {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    axios = async () =>{
        var params = new URLSearchParams();
        params.append('QnA_title', this.state.QnA_title)
        params.append('QnA_content', this.state.QnA_content)
        params.append('user_id', this.state.user_id)
        await axios.post('/api/QNAInsert/'+this.props.location.state.id, params)
        .then((Response) => {
         console.log(Response);   
        }).catch((ex)=>{
         console.log(ex);
        })
        
    }
    



    render() {
        return (
            <div>
            <HeaderMenu/>
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
            </div>
        )
    }
}

export default withRouter(QnAInsert); 
