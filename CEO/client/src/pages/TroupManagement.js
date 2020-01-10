import React, {Component} from 'react';
import TroupManagementTable from 'components/TroupManagementTable';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';
import { withRouter, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import jwt_decode from 'jwt-decode';
import axios from 'axios';




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
        padding: theme.spacing(1)
      },
      button: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1)
    }
})

class TroupManagement extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            troupManagement: '',
            completed: 0,
            searchKeyword: '',
            user_id:''
            
        }
    }

    stateRefresh = () => {
        this.setState({
            troupManagement: '',
            completed: 0
        
       });
       this.axios();
    }
    
    componentWillMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)

        this.setState({user_id: decoded.user_id})
        console.log("setState 실행11")
        this.axios();
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)

        this.setState({user_id: decoded.user_id})
        console.log("setState 실행")
        this.axios();
    }

    
    axios=()=>{
        let user_id= this.state.user_id;
        var params = new URLSearchParams();
        params.append('user_id',user_id)
        axios.post('/api/troupManagement/',params)
        .then((Response) => {
            console.log(Response);
            this.setState({troupManagement:Response.data});
        }).catch((ex) =>{
            console.log(ex);
        })
    }

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
      };


      page=()=>{
        this.props.history.push('/troupManagementUpdate')
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
        const filteredComponents = (data) => {
            data = data.filter((c) => {
                return c.troup_name.indexOf(this.state.searchKeyword) > -1;
            });
            return data.map((c) => {
                return <TroupManagementTable stateRefresh={this.stateRefresh} user_id={c.user_id} troup_name={c.troup_name} troup_phone={c.troup_phone} bank_name={c.bank_name}  bank_account={c.bank_account} kakao_account={c.kakao_account} seat_yn={c.seat_yn}  troup_id={c.troup_id} theater_name={c.theater_name} theater_location={c.theater_location} latitude={c.latitude} longtitude={c.longtitude}/>


            })
        }
        const { classes } = this.props;
        const cellList = [ "ID", "극단이름", "전화번호", "은행명", "계좌번호", "카톡아이디", "극장이름", "극장위치"]
        
        return(
            <main className={classes.layout}>
            <div>
            <Paper className={classes.paper}>
             <Container class= "Troup_management_table">
                <Table className={classes.table}>
                    <TableHead >
                        <TableRow>
                            {cellList.map(c => {
                                return <TableCell className={classes.tableCell}>{c}</TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.troupManagement ?
                        filteredComponents(this.state.troupManagement) :
                        <TableRow>
                            <TableCell colSpan="6" align="center">
                                <CircularProgress  variant="determinate" value={this.state.completed} />
                            </TableCell>
                            </TableRow>
                            }
                    </TableBody>
                </Table>
                <Link to={

{
    pathname:"/ManagementMenu/troupManagementUpdate",
    state:{
        list:this.state.troupManagement
    }


}
}>
<Button className={classes.button} variant="contained" color="primary">수정</Button>
</Link>


                <Button className={classes.button} variant="contained" color="primary" onClick={this.page2}>돌아가기</Button>
                </Container>
                </Paper>


                </div>
                </main>

                    
                
        );


    };
}
             export default withRouter((withStyles)(styles)(TroupManagement));