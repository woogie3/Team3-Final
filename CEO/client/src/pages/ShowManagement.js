import React, {Component} from 'react';
import ShowManagementTable from 'components/ShowManagementTable';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import { CircularProgress,Paper } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/Styles';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import '../css/ShowManagement.css';


const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.up("lg")]: {
          width: '100%',
          marginLeft: theme.spacing(4),
          marginRight: theme.spacing(4),
        },
      },
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        padding: theme.spacing(1),
        [theme.breakpoints.between('lg', 'xl') ]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          marginLeft: theme.spacing(4),
          marginRight: theme.spacing(4),
          padding: theme.spacing(3),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
        }
      },
      table: {
        marginBottom: theme.spacing(3)
    },
    tableCell:{
      minWidth: 80,
    },
    button: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1)
    }
});

class ShowManagement extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showManagement: '',
            completed: 0,
            searchKeyword: '',
            user_id:'',
            troup_id:''
            
        }
        
        
    }

    stateRefresh = () => {
        this.setState({
            showManagement: '',
            completed: 0
        
       });
       //this.axios();
    }


    

   componentDidMount() {
    // const token = localStorage.usertoken
   // const decoded = jwt_decode(token)
  this.a();
   // this.setState({user_id: decoded.user_id})
  //this.axios();
   
}

   a=()=>{
    let bb;
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({user_id: decoded.user_id})
    var params = new URLSearchParams()
    params.append('user_id',decoded.user_id)
    axios.post('/api/getuserid/',params)
       .then((Response) => {
           this.setState({troup_id:Response.data[0]['troup_id']})
           bb=Response.data[0]['troup_id'];
           console.log("troup_id: "+bb)
           this.d(bb)
       }).catch((ex) =>{
           console.log(ex);
       })
   }


   d=(pp)=>{
       var params = new URLSearchParams();
       params.append('troup_id',pp)
       axios.post('/api/showManagement/',params)
       .then((Response) => {
           console.log(Response.data)
           this.setState({showManagement:Response.data});
       }).catch((ex) =>{
           console.log(ex);
       })
   }

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
      };


      page=()=>{
        this.props.history.push('/RegistorationMenu/showManagementAdd')
    }

    page2=()=>{
        this.props.history.push('/')
    }

    

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        const ShowList = (data) => {
            data = data.filter((c) => {
                return c.show_title.indexOf(this.state.searchKeyword) > -1;
            });
            return data.map((c) => {
                return <ShowManagementTable stateRefresh={this.stateRefresh} troup_id={c.troup_id} show_title={c.show_title} start_date={c.start_date} end_date={c.end_date} show_preview={c.show_preview} show_content={c.show_content} genre_name={c.genre_name} genre_content={c.genre_content} show_length={c.show_length} />


            })
        }
        const { classes } = this.props;
        const cellList = ["공연썸네일", "공연제목", "시작일자", "종료일자", "공연길이", "장르명", "장르설명", "공연설명","삭제"]
        
        return(
            <main className={classes.layout}>
            <div>
            <Paper className={classes.paper}>
             <Container class= "Show_management_table">
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {cellList.map(c => {
                                return <TableCell className={classes.tableCell}>{c}</TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.showManagement ?
                        ShowList(this.state.showManagement) : 
                        <TableRow>
                            <TableCell colSpan="6" align="center">
                                <CircularProgress  variant="determinate" value={this.state.completed} />
                            </TableCell>
                        </TableRow>
                            }
                    </TableBody>
                </Table>
                <Button className={classes.button} variant="contained" color="primary" onClick={this.page}>등록</Button>
                <Button className={classes.button} variant="contained" color="primary" onClick={this.page2}>돌아가기</Button>
                </Container>
                </Paper>

                </div>
                </main>
                    
                
        );


    };
}

export default withRouter((withStyles)(styles)(ShowManagement));