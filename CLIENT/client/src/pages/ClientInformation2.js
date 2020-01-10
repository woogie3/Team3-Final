import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import jwt_decode from 'jwt-decode';

class ClientInformation2 extends React.Component {

    constructor(props) {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        super(props);
        this.state = {
            user_id: decoded.user_id,
            name: decoded.name,
            password: '',
            email: decoded.email,
            phone:decoded.phone,
            dislike_genre: '',
            exclude_show: ''
        }
        this.stateRefresh = this.stateRefresh.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.changeinformation = this.changeinformation.bind(this)
    }

    stateRefresh = () => {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
            user_id: decoded.user_id,
            name: decoded.name,
            password: '',
            email: decoded.email,
            phone:decoded.phone,
            dislike_genre: '',
            exclude_show: ''
        })
        this.props.stateRefresh();
    }
    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.state = {

            user_id: decoded.user_id,
            name: decoded.name,
            password: '',
            email: decoded.email,
            phone:decoded.phone,
            dislike_genre: '',
            exclude_show: ''
        }
    }
    handleFormSubmit(e) {
        e.preventDefault()
        this.changeinformation()
        this.setState({

            user_id: '',
            name: '',
            password: '',
            email: '',
            phone:'',
            dislike_genre: '',
            exclude_show: ''
        })
        // window.location.reload()
        this.props.history.push('/main')
    }

    handleValueChange(e) {

        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    
    showUser = async () => {
    
        const response = await fetch('/api/showUser/'+this.state.user_id);
        const body1 = await response.json();
        return body1
      }

    addDislikeGenre() {
        
    }


    changeinformation() {
        const url = '/api/modifyUser';
        var params = new URLSearchParams();
        params.append('user_id', this.state.user_id)
        params.append('name', this.state.name)
        params.append('password', this.state.password)
        params.append('email', this.state.email)
        params.append('phone', this.state.phone)
        axios.post(url, params)
        .then((Response) => {
         console.log(Response);   
        }).catch((ex)=>{
         console.log(ex);
        })

    }


    render() {

        return (
            <div className="col-md-6 mt-5 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal text-center login">회원정보수정</h1>
                <div className="form-group">
                    <label className="font-weight-bold" htmlFor="text">이름</label>
                    <input className="form-control" label="" type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br />
                </div>
                <div className="form-group">
                    <label className="font-weight-bold" htmlFor="text">비밀번호</label>
                    <input className="form-control" label="" type="password" name="password" value={this.state.password} onChange={this.handleValueChange} /><br />
                </div>
                <div className="form-group">
                    <label className="font-weight-bold" htmlFor="text">이메일</label>
                    <input className="form-control" label="" type="text" name="email" value={this.state.email} onChange={this.handleValueChange} /><br />
                </div>
                <div className="form-group">
                    <label className="font-weight-bold" htmlFor="text">전화번호</label>
                    <input className="form-control" label="" type="text" name="phone" value={this.state.phone} onChange={this.handleValueChange} /><br />
                </div>
                {/* 보고싶지않은장르<br />
                <TextField label="" type="text" name="dislike_genre" value={this.state.dislike_genre} onChange={this.handleValueChange} />
                <Button>추가</Button><br />
                제외된목록: <Button>목록보기</Button><br /> */}
                <Button onClick={this.handleFormSubmit}>확인</Button>
                <Button >취소</Button>
            </div>
        )

    }

}


export default ClientInformation2;  