import React, {Component} from 'react';
import {register} from './UserFunctions';
import zxcvbn from 'zxcvbn';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            user_id: '',
            user_id_valid:'',
            isDuplicateUser: false,
            funnel_id: 1,
            name: '',
            name_valid:'',
            password: '',
            password_valid:'',
            passwordScore: '',
            confirmPassword: '',
            confirmPassword_valid:'',
            identification_number: '',
            identification_number_valid:'',
            email: '',
            email_valid:'',
            role: 'ceo',
            phone: '',
            phone_valid: '',
            message_yn: false,
            dislike_genre: null,
            wishlist: null,
            noshow_count: null,
            join_date: null
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChecked = this.handleChecked.bind(this)
    }

    
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    

    onSubmit(e) {
        e.preventDefault();
        
        const user ={
            user_id: this.state.user_id,
            funnel_id: this.state.funnel_id,
            name: this.state.name,
            password: this.state.password,
            identification_number: this.state.identification_number,
            email: this.state.email,
            role: this.state.role,
            phone: this.state.phone,
            message_yn: this.state.message_yn,
            dislike_genre: this.state.dislike_genre,
            wishlist: this.state.wishlist,
            noshow_count: this.state.noshow_count,
            join_date: this.state.join_date
        }

        register(user).then((res,err) => {
            if(res) {
                alert("회원가입 완료");
                this.props.history.push('/login');
            } else if (res === null || res === err) {
                this.props.history.push("/register");
            }
        })
    }


    // 유효성 검사
    inputClassNameHelper = boolean => {
        switch(boolean) {
            case true:
                return 'is-valid';
            case false:
                return 'is-invalid';
            default:
                return '';
        }
    };

    validateUser_id = user_id => {
        if(user_id.length > 4) {
            this.setState({
                user_id_valid: true,
                user_id
            });
        } else {
            this.setState({
                user_id_valid: false,
                user_id
            });
        }
    };

    isUser_id_valid = () => {
        const { user_id, user_id_valid } = this.state;

        if(user_id) return user_id_valid;
    };

    isName_valid = () => {
        const { name, name_valid } = this.state;

        if(name) return name_valid;
    };

    validateName = name => {
        const nameRegExp = /[a-z0-9]|[\]{}<>?|`~!@#$%^&*-_+=,.;:"'\\]/g;

        if(name.match(nameRegExp) || name.length < 2) {
            this.setState({
                name_valid: false,
                name
            });
        } else {
            this.setState({
                name_valid: true,
                name
            });
        }
    };

    isPassword_valid = () => {
        const{password, password_valid} = this.state;

        if(password) return password_valid;
    }

    validatePassword = (password) => {
        const { passwordScore} = this.state;
        const { score } = zxcvbn(password);
        this.setState({ passwordScore: score});

        if(passwordScore <= 2) {
            this.setState({
                password_valid: false,
                password
            });
        } else {
            this.setState({
                password_valid: true,
                password
            })
        }
    }
    isConfirmPassword_valid = () => {
        const {confirmPassword, confirmPassword_valid} = this.state;
        if(confirmPassword) return confirmPassword_valid;
    }

    validateConfirmPassword = (confirmPassword) => {
        const {password} = this.state;

        if(password === confirmPassword){
            this.setState({
                confirmPassword_valid:true,
                confirmPassword
            });
        } else {
            this.setState({
                confirmPassword_valid: false,
                confirmPassword
            })
        }
    };
    renderFeedbackMessageConfirmPassword = () => {
        const {password, confirmPassword} = this.state;

        if(password === confirmPassword) {
            return(
            <div className="valid-feedback">
                비밀번호가 일치합니다
            </div>
            )
        } else {
            return(
            <div className="invalid-feedback">
                비밀번호가 맞지 않습니다
            </div>
            )
        }
    } 

    renderFeedbackMessage = () => {
        const { passwordScore} = this.state;
        let message, className;
        
        switch(passwordScore) {
            
            case 0 :
                message = '비밀번호가 너무 쉽습니다.';
                className = 'text-danger';
                break;
            case 1 :
                message = '비밀번호가 너무 쉽습니다.';
                className = 'text-danger';
                break;
            case 2:
                message = '비밀번호가 약합니다.';
                className = 'text-warning';
                break;
            case 3:
                message = '비밀번호가 괜찮습니다.';
                className = 'text-success';
                break;
            case 4:
                message = '비밀번호가 매우 좋습니다.';
                className = 'text-primary';
                break;
            default:
                message='';
                break;
        }
        return(
        <small id="passwordHelp" className={`form-text mt-2 ${className}`}>
            {`${message}`}
        </small>
        );
    }

    isEmail_valid = () => {
        const { email, email_valid } = this.state;

        if(email) return email_valid;
    } 
    
    validateEmail = email => {
        const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        
        if(email.match(emailRegExp)) {
            this.setState({
                email_valid: true,
                email
            });
        } else {
            this.setState({
                email_valid: false,
                email
            });
        }
    };

    isIdentification_number_valid = () => {
        const { identification_number, identification_number_valid} = this.state;

        if(identification_number) return identification_number_valid;
    }

    validateIdentification = identification_number => {
        const identification_numberRegExp = /^[0-9]+$/;

        if(identification_number.match(identification_numberRegExp) && identification_number.length === 10) {
            this.setState({
                identification_number_valid: true,
                identification_number
            });
        } else {
            this.setState({
                identification_number_valid: false,
                identification_number
            });
        }
    };

    isPhone_valid = () => {
        const { phone, phone_valid} = this.state;
        if(phone) return phone_valid;
    }

    validatePhone = phone => {
        const phoneRegExp = /^[0-9]+$/;
        
        if(phone.match(phoneRegExp) && phone.length === 11) {
            this.setState({
                phone,
                phone_valid: true
            });
        } else {
            this.setState({
                phone_valid: false,
                phone
            })
        }
    }

    handleChecked = () => {
        this.setState({message_yn: !this.state.message_yn})
    }

    

    render() {
        return(
            <div className="container">
                
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <h1 className="h3-mb-3 font-weight-normal text-center">회원가입</h1>
                            <div className="form-group">
                                <label htmlFor="text">아이디</label>
                                <input type="text"
                                className={`form-control ${this.inputClassNameHelper(this.isUser_id_valid())}`}
                                name="user_id"
                                placeholder="아이디 (영문자와 숫자 조합)"
                                value={this.state.user_id}
                                onChange={e => this.validateUser_id(e.target.value)}
                                required
                                />
                                <div className="invalid-feedback">
                                    아이디를 올바르게 입력해주세요
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">이름</label>
                                <input type="text"
                                className={`form-control ${this.inputClassNameHelper(this.isName_valid())}`}
                                name="name"
                                placeholder="이름"
                                value={this.state.name}
                                onChange={e => this.validateName(e.target.value)}
                                required
                                />
                                <div className="invalid-feedback">
                                    이름을 올바르게 입력해주세요
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">비밀번호</label>
                                <input type="password"
                                className={`form-control ${this.inputClassNameHelper(this.isPassword_valid())}`}
                                name="password"
                                placeholder="비밀번호"
                                value={this.state.password}
                                onChange={e => this.validatePassword(e.target.value)}
                                />
                                {this.renderFeedbackMessage()}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">비밀번호확인</label>
                                <input type="password"
                                className={`form-control ${this.inputClassNameHelper(this.isConfirmPassword_valid())}`}
                                name="confirmPassword"
                                placeholder="비밀번호 확인"
                                value={this.state.confirmPassword}
                                onChange={e => this.validateConfirmPassword(e.target.value)}
                                />
                                {this.renderFeedbackMessageConfirmPassword()}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">이메일</label>
                                <input type="email"
                                className={`form-control ${this.inputClassNameHelper(this.isEmail_valid())}`}
                                name="email"
                                placeholder="이메일 예)ooo@gmail.com"
                                value={this.state.email}
                                onChange={e => this.validateEmail(e.target.value)}
                                required
                                />
                                <div className="invalid-feedback">
                                    이메일을 올바르게 입력해주세요
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">사업자번호</label>
                                <input type="text"
                                className={`form-control ${this.inputClassNameHelper(this.isIdentification_number_valid())}`}
                                name="identification_number"
                                placeholder="사업자번호 '-' 빼고 입력해주세요"
                                value={this.state.identification_number}
                                onChange={e => this.validateIdentification(e.target.value)}
                                required
                                />
                                <div className="invalid-feedback">
                                    사업자번호를 올바르게 입력해주세요
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">핸드폰 번호</label>
                                <input type="text"
                                className={`form-control ${this.inputClassNameHelper(this.isPhone_valid())}`}
                                name="phone"
                                placeholder="핸드폰번호 '-' 빼고 입력해주세요"
                                value={this.state.phone}
                                onChange={e => this.validatePhone(e.target.value)}
                                required
                                />
                                <div className="invalid-feedback">
                                    핸드폰번호를 올바르게 입력해주세요
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input type="checkbox"
                                    className="form-check-input"
                                    name="message_yn"
                                    placeholder="문자수신여부"
                                    value={this.state.message_yn}
                                    onChange={this.handleChecked}
                                    />
                                    <label className="form-check-label">문자수신여부</label>
                                </div>
                            </div>
                            
                                <button type="submit"
                                 className="btn btn-lg btn-primary btn-block">
                                 회원가입
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;