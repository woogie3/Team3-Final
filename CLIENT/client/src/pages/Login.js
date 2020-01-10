import React, {Component} from 'react';
import {login} from '../components/UserFunctions';
import {Link} from 'react-router-dom';
import '../css/Login.css'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            user_id: '',
            user_idValid: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("login onSubmit")
        const user ={
            user_id: this.state.user_id,
            password: this.state.password
        }

        login(user).then(res => {
            if(res) {
                console.log(res)
                this.props.history.push('/main')
                window.location.reload();
            }
        })
    }

    isUserIdValid = () => {
        const { user_id, user_idValid } = this.state;

        if(user_id) return user_idValid;
    };

    inputClassNameHelper = boolean => {
        switch (boolean) {
            case true:
                return 'is-valid';
            case false:
                return 'is-invalid';
            default:
                return '';
        }
    };

    user_idValid = user_id => {
        if(user_id.length > 4) {
            this.setState({
                user_idValid: true,
                user_id
            });
        } else {
            this.setState({
                user_idValid: false,
                user_id
            });
        }
    };

    render() {
        return(
            <div className="container">
                <video width="100%" controls autoPlay loop>
                    <source src = "/image/main.mp4" type="video/mp4"></source>
                </video>
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal text-center login">로그인</h1>
                            <div className="form-group">
                                <label htmlFor="text" className="font-weight-bold">아이디</label>
                                <input type="text"
                                className={`form-control ${this.inputClassNameHelper(this.isUserIdValid())}`}
                                name="user_id"
                                placeholder="아이디"
                                value={this.state.user_id}
                                onChange={e => this.user_idValid(e.target.value)}
                                required />
                                <div className="invalid-feedback">
                                    아이디를 입력하세요.
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="font-weight-bold">비밀번호</label>
                                <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="비밀번호"
                                value={this.state.password}
                                onChange={this.onChange}
                                />
                            </div>
                                <button className="btn btn-lg btn-dark btn-block" type="submit">
                                 로그인
                                </button>
                                <Link  to="/register" className="reigster">
                                <button className="btn btn-lg btn-dark btn-block">
                                    회원가입
                               </button>
                               </Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;