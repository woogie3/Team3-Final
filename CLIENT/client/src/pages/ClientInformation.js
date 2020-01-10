import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import {login} from '../components/UserFunctions';
import '../css/ClientInformation.css';

class ClientInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            password: '',
            users: ''
        }
    }
    stateRefresh = () => {
        this.setState({
            user_id: '',
            password: '',
            users: ''
        });
        this.callApi()
            .then(res => this.setState({ users: res }))
            .catch(err => console.log(err));
    }
    componentDidMount() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.state.user_id = decoded.user_id;

    }
    // callApi = async () => {
    //     const response = await fetch('/api/ClientInformation/'+this.state.user_id)
    //     const body = await response.json();
    //     return body;
    // }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleFormSubmit = (e) => {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        e.preventDefault();
        const user ={
            user_id: this.state.user_id,
            password: this.state.password
        }
        if(this.state.password === decoded.password){
            localStorage.removeItem("usertoken");
        }
        login(user).then(res => {
            if(res) {
                console.log(res)
                this.props.history.push('/ClientInformation2')
            }
            window.location.reload();
        })
        // if (this.state.users === this.state.password) {
        //     this.props.history.push('/ClientInformation2')
        // } else {
        //     alert("비밀번호가 일치하지 않습니다");
        // }

        this.setState({
            user_id: '',
            password: ''
        })
    }


    render() {

        return (
            <div className="col-md-6 mt-5 mx-auto">
                <form onSubmit={this.handleFormSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal text-center login">비밀번호인증</h1>
                    <div className="lock">
                        <img className = "lock" src='/image/lock.png' alt="이미지 없음" width="40" height="40" />
                    </div>
                    <div className="lock-text">
                        정보를 안전하게 보호하기 위해 <br/>
                        <div className="lock-danger">
                        비밀번호를 다시 한 번 확인합니다. <br/>
                        </div>
                        비밀번호가 타인에게 노출 되지 않도록 항상 주의하세요.<br/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="font-weight-bold">비밀번호</label>
                        <input className="form-control" type="password" placeholder="비밀번호" values={this.state.password} name="password" onChange={this.handleValueChange}  /> <br />
                    </div>
                    <button className="btn btn-lg btn-dark btn-block" type="submit">확인</button>
                    <button className="btn btn-lg btn-dark btn-block" type="reset">취소</button>
                </form>
            </div>
        )
    }
}

export default ClientInformation;                           