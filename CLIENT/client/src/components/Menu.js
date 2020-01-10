import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom';
import '../css/Menu.css'

class Menu extends Component {
    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('usertoken');
        alert("로그아웃 되었습니다.");
        this.props.history.push(`/`);
        window.location.reload();
    }
    render() {
        let logout;
        const activeStyle = {
            color: '#9e9e9e',
            //fontSize: '1.5rem'
        };
        if (localStorage.usertoken) {
           logout = <NavLink to="" onClick={this.logOut.bind(this)} >로그아웃</NavLink>
        } else { logout = ''}

        return (
            <nav className="navbar">
                <div className="container-menu">
                    <ul className="nav nav-right">
                        <li className="test"><NavLink to="/main" activeStyle={activeStyle}>메인</NavLink></li>
                        <li className="test"><NavLink to="/Schedule" activeStyle={activeStyle}>공연일정</NavLink></li>
                        <li className="test"><NavLink to="/QNA" activeStyle={activeStyle}>문의사항</NavLink></li>
                        <li className="test"><NavLink to="/MyShow" activeStyle={activeStyle}>나의공연</NavLink></li>
                        <li className="test"><NavLink to="/clientinformation" activeStyle={activeStyle}>회원정보수정</NavLink></li>
                        {/* <li><NavLink to="/clientinformation2" activeStyle={activeStyle}>회원정보수정2</NavLink></li> */}
                        {/* <li><NavLink to="/login" activeStyle={activeStyle}>로그인</NavLink></li> */}
                        <li className="test">
                            {/* <ExpansionPanel>
                                <ExpansionPanelSummary >
                                    <img src='/image/profile.png' alt="이미지 없음" width="40" height="40" />
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails >
                                    {logout}
                                    </ExpansionPanelDetails>
                                </ExpansionPanel> */}
                                
                                {logout}
                        </li>
                        <li>
                        <img src='/image/profile.png' alt="이미지 없음" width="40" height="40" />
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(Menu);