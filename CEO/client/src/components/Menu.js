import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import "../css/Menu.css";
import Title from '../imges/Title.png';




const styles = theme => ({
    '@global': {
        ul: {
          margin: 0,
          padding: 0,
        },
        li: {
          listStyle: 'none',
        },
      },
      appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: 1100,
        width : '100%'
      },
      toolbar: {
        flexWrap: 'wrap',
      },
      toolbarTitle: {
        flexGrow: 2,
      },
      link: {
        margin: theme.spacing(1, 1.5)
      },
      heroContent: {
        padding: theme.spacing(8, 0, 6),
      },
      cardHeader: {
        backgroundColor:
          theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
      },
      cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
      }
    })

class Menu extends Component {

    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('usertoken')
        this.props.history.push(`/login`)
    }
    render(){
        const { classes } = this.props;

        const loginRegLink = (
            <nav>
            <Button href="/login" color="primary" variant="outlined" className="button-link">
                로그인
            </Button>
            <Button href="/register" color="primary" variant="outlined" className="button-link">
                회원가입
            </Button>
            </nav>
            )
        const userLink = (
            <Button href="" color="primary" variant="outlined" className="button-link" onClick={this.logOut.bind(this)}>
                로그아웃
            </Button>
        )
        return (
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h4" color="inherit" noWrap className={classes.toolbarTitle}>
                      <Link href="/">
                      <img src={Title} alt ="img1" className="title-menu-img"/>
                      </Link>
                    </Typography>
                    <nav>
                        <Link variant="button" color="textPrimary" href="/RegistorationMenu" className={classes.link}>
                            등록
                        </Link>
                        <Link variant="button" color="textPrimary" href="/ManagementMenu" className={classes.link}>
                            관리
                        </Link>
                        <Link variant="button" color="textPrimary" href="/Analysis" className={classes.link}>
                            분석
                        </Link>
                        <Link variant="button" color="textPrimary" href="/QnA" className={classes.link}>
                            문의게시판
                        </Link>
                    </nav>
                    {localStorage.usertoken ? userLink : loginRegLink}

            {/* <div>
                
                <ul>
                    <li><NavLink exact to="/RegistorationMenu" activeStyle={activeStyle}>등록</NavLink></li>
                    <li><NavLink to="/ManagementMenu" activeStyle={activeStyle}>관리</NavLink></li>
                    <li><NavLink to="/Analysis" activeStyle={activeStyle}>분석</NavLink></li>
                    <li><NavLink to="/QnA" activeStyle={activeStyle}>문의게시판</NavLink></li>
                </ul>
                <hr/>
            </div> */}
                </Toolbar>
            </AppBar>
        );
    }
};

export default withRouter((withStyles)(styles)(Menu));