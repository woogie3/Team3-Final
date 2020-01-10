import React, {Component} from 'react';
import {register} from '../components/UserFunctions';
import zxcvbn from 'zxcvbn';
import '../css/Register.css'

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
            role: 'client',
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
        
        register(user).then(res => {
            console.log(res)
            if(res) {
                console.log("dgjgrlgior"+res)
                console.log(this.props.history)
                this.props.history.push('/login');
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
        const identification_numberRegExp = /^\d{3}\d{5}\d{5}$/;
        
        if(identification_number.match(identification_numberRegExp)) {
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
        const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;
        if(phone.match(phoneRegExp)) {
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
    
    onChange = (e) => {
           this.setState({[e.target.name]: e.target.value})
    }
    
    handleRadio = (e) => {
        document.getElementsByName("funnel_id").setAttribute("checked","false");
        e.target.checked = "true";
        this.setState({[e.target.name]: e.target.value})
    }
    
    clear = () => {
        this.props.history.push('/')
    }
  

    render() {
        return(
            <div className="container">
                 <video width="100%" controls autoPlay loop>
                    <source src = "/image/main.mp4" type="video/mp4"></source>
                </video>
                <div className="row-register">
                    <div className="col-md-6 mx-auto">
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
                                <label htmlFor="text">주민번호</label>
                                <input type="text"
                                className={`form-control ${this.inputClassNameHelper(this.isIdentification_number_valid())}`}
                                name="identification_number"
                                placeholder="주민번호 예)9103272068554"
                                value={this.state.identification_number}
                                onChange={e => this.validateIdentification(e.target.value)}
                                required
                                />
                                <div className="invalid-feedback">
                                    주민번호를 올바르게 입력해주세요
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">핸드폰 번호</label>
                                <input type="text"
                                className={`form-control ${this.inputClassNameHelper(this.isPhone_valid())}`}
                                name="phone"
                                placeholder="핸드폰번호 예)01011111111"
                                value={this.state.phone}
                                onChange={e => this.validatePhone(e.target.value)}
                                required
                                />
                                <div className="invalid-feedback">
                                    핸드폰번호를 올바르게 입력해주세요
                                </div>
                            </div>
                            <div className="form-group">
                                    <label> 유입경로 설문조사
                                <div className="radio">
                                <label>
                                    <input type="radio" name="funnel_id" value={1} onChange={this.onChange} />
                                    SNS
                                </label>
                                </div>
                                <div className="radio">
                                <label>
                                    <input type="radio" name="funnel_id" value={2} onChange={this.onChange} />
                                    지인
                                </label>
                                </div>
                                <div className="radio">
                                <label>
                                    <input type="radio" name="funnel_id" value={3} onChange={this.onChange} />
                                    광고
                                </label>
                                </div>
                                </label>
                            </div>
                                <button type="submit"
                                 className="btn btn-lg btn-dark btn-block">
                                 가입
                                </button>
                                <button type="button"
                                 className="btn btn-lg btn-dark btn-block" onClick={this.clear}>
                                 취소
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;