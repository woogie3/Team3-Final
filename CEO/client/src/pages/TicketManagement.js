import React,{ Component } from 'react';
import TicketListTable from 'components/TicketListTable';
import Table from '@material-ui/core/Table';
import formAxios, {post} from 'axios';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { CircularProgress, Box, Paper } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import RefundListTable from '../components/RefundListTable';
// import RefundInputForm from '../components/RefundInputForm';
import {withStyles, createMuiTheme} from '@material-ui/core/Styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Select, MenuItem } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';





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
  selectEmpty: {
    height: 20
  },
button: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
})

// const show_times=["","91221","91222","91223","91224","91225","91226"]
// const options =[ "시간대를 선택해주세요", "10:00~12:00", "13:00~15:00", "16:00~18:00", "19:00~21:00"]
class TicketManagement extends Component{
        constructor(props) {
        super(props);
        this.state = {
          ticketings:'',
          completed:0,
          searchKeyword1:'',
          searchKeyword2:'',
          value: '',
          show_time: '',
          key: '',
          show: '',
          seatNo: '',
          row: '',
          column: '',
          ticket_id: '',
          change_type: ''
        }
        this.stateRefresh = this.stateRefresh.bind(this);
        this.handleFormSubmit1 =this.handleFormSubmit1.bind(this);
        this.handleFormSubmit2 =this.handleFormSubmit2.bind(this);

      }
    //   onChange(e) {
    //     this.setState({
    //         value: e.target.value
    //     })
    // }
      
      

    formAxios = () =>{
      var params = new URLSearchParams();
      params.append('show_time', this.state.show_time)
      params.append('row', this.state.row)
      params.append('column', this.state.column)
      params.append('ticket_id', this.state.ticket_id)
      formAxios.post('/ticketing/changeSeat', params)
      .then((Response) => {
        console.log(Response);
      }).catch((ex)=>{
        console.log(ex)
      })
      console.log(params)
    }
      stateRefresh = () => {
        this.setState({
          ticketings:'',
          completed:0,
          searchKeyword1:'',
          searchKeyword2:'',
          value: '',
          key: '',
          show_time: '',
          seatNo: '',
          row: '',
          column: '',
          ticket_id: '',
          change_type: ''
          
      });
        this.callApi1()
        .then(res => this.setState({ticketings: res}))
        .catch(err => console.log(err));
        this.callApi2()
        .then(res => this.setState({refunds: res}))
        .catch(err => console.log(err));
        this.callApi3()
        .then(res => this.setState({seats: res}))
        .catch(err => console.log(err));
      }

    
      componentDidMount(){
        this.timer = setInterval(this.progress, 20);
        this.callApi1()
        .then(res => this.setState({ticketings: res}))
        .catch(err => console.log(err));
        this.callApi2()
        .then(res => this.setState({refunds: res}))
        .catch(err => console.log(err));
        this.callApi3()
        .then(res => this.setState({seats: res}))
        .catch(err => console.log(err));
      }
    
      callApi1 = async() => {
        const response = await fetch('/api/ticketings');
        const body = await response.json();
        return body;
      }
      callApi2 = async() => {
        const response = await fetch('/api/refunds');
        const body = await response.json();
        return body;
      }
      callApi3 = async() => {
        const response = await fetch('/ticketing/seats');
        const body = await response.json();
        return body;
      }
      
    
      progress = () => {
        const {completed} = this.state;
        this.setState({completed: completed >= 100 ? 0 : completed +1});
      };
      handleFormSubmit1= (e) => {
        e.preventDefault()
        this.formAxios();
        // .then((response) => {
        //   console.log(response.data);
        //   this.props.stateRefresh();
        // })
        this.setState({
          seatNo: '',
          row: '',
          column: '',
          ticket_id: ''
        })
      }
      handleFormSubmit2(e) {
        e.preventDefault();
        this.formAxios();
        this.setState({
          show_time: '',
          seatNo: '',
          row: '',
          column: '',
          ticket_id: ''
        })
      }
    
    
      handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
      }
      refundCreate = (data3) => {
        console.log(data3);
      }
      
      
      // changeTicket_Seat(){
      //   const url = '/ticketing/changeSeat';
      //   const axios = new Axios();
      //   axios.append('keys', this.state.seatNo);
      //   axios.append('row', this.state.column);
      //   axios.append('column', this.state.column);
      //   axios.append('id', this.state.ticket_id);
      //   const config ={
      //     headers: {
      //       'content-type': 'multipart/form-data'
      //     }
      //   }
      //   return post(url, axios, config)
      // }
      // changeTicket_All(){
      //   const url = '/ticketing/changeAll';
        
      //   const axios = new Axios();
      //   axios.append('show', this.state.show);
      //   axios.append('keys', this.state.seatNo);
      //   axios.append('row', this.state.column);
      //   axios.append('column', this.state.column);
      //   axios.append('id', this.state.ticket_id);
      //   const config ={
      //     headers: {
      //       'content-type': 'multipart/form-data'
      //     }
      //   }
      //   return post(url, axios, config)
      // }
    
      render(){
        
        const filteredComponents1 = (data1) =>{
           data1 = data1.filter((c) => {
             return c.phone.indexOf(this.state.searchKeyword1) > -1;
            });
          return data1.map((c) => {
            return <TicketListTable stateRefresh={this.stateRefresh} name={c.name} user_id={c.user_id} ticketing_id = {c.ticketing_id} phone={c.phone} show_title={c.show_title} show_time={c.show_time} keys={c.key} ticketing_date={c.ticketing_date}/>
          })
        }
        const cellList = ["이름", "ID", "예매 번호", "전화번호", "상영작", "시간대", "좌석번호", "예매일자"]
        
        const filteredComponents2 = (data2) =>{
          data2 = data2.filter((d) => {
            return d.phone.indexOf(this.state.searchKeyword2) > -1;
          });
         return data2.map((d) => {
           return <RefundListTable stateRefresh={this.stateRefresh} user_id={d.user_id} phone={d.phone} name={d.name} show_title={d.show_title} show_time={d.show_time} ticketing_id={d.ticketing_id} payment_type={d.payment_type} reason_type={d.reason_type}/>
         })
       }
       const cellList1 = ["ID", "이름", "전화번호", "상영작", "시간대", "예매번호", "환불유형", "사유"]
       const { classes } = this.props;
        return (
          <main className={classes.layout}>
          <div>
            <Paper className={classes.paper}>
            <Box class="ticket_list_table">
            <label class=""></label>
            <Typography variant="h5" gutterBottom>
                예매 내역
            </Typography>
            <label>전화번호 - </label>
            <InputBase
              placeholder="검색하기"
              
              name="searchKeyword1"
              value={this.state.searchKeyword1}
              onChange = {this.handleValueChange}
              inputProps={{ 'aria-label': 'search' }}
            />
            <Table id="ticket-list" className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.ticketings ? filteredComponents1(this.state.ticketings) :
              <TableRow >
                <TableCell colSpan="7" align ="center" value>
                  <CircularProgress  variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>}
            </TableBody>
          </Table>
          <div id="All" ></div> 
		      <div id="only_Ticket_id" ></div> 
          </Box>
          <br/>
          <Box class="ticket_change_box">
          

          <form onSubmit={this.handleFormSubmit1}>
          <Typography variant="h5" gutterBottom>
                예매 변경
            </Typography>
              <br/>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">변경유형</InputLabel>
                <Select
                  required
                  className={classes.selectEmpty}
                  displayEmpty
                  fullWidth>
                    <MenuItem>좌석 변경</MenuItem>
                    <MenuItem>시간대 변경</MenuItem>
                </Select>
                </Grid>
                <Grid item xs={12} sm={3}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">시간대 변경</InputLabel>
                <Select
                  required
                  className={classes.selectEmpty}
                  displayEmpty
                  fullWidth>
                    <MenuItem>10:00~12:00</MenuItem>
                    <MenuItem>13:00~15:00</MenuItem>
                    <MenuItem>15:00~17:00</MenuItem>
                    <MenuItem>18:00~20:00</MenuItem>
                </Select>
                </Grid>
                <Grid item xs={12} sm={2}>
                <TextField
                    required
                    id="ticket_id"
                    name="ticket_id"
                    label="예매 번호"
                    value={this.state.ticket_id}
                    onChange={this.handleValueChange}
                    fullWidth
                />
                </Grid>
                <Grid item xs={12} sm={2}>
                <TextField
                    required
                    id="row"
                    name="row"
                    label="변경좌석(행)"
                    value={this.state.row}
                    onChange={this.handleValueChange}
                    fullWidth
                />
                </Grid>
                <Grid item xs={12} sm={2}>
                <TextField
                    required
                    id="column"
                    name="column"
                    label="변경좌석(열)"
                    value={this.state.column}
                    onChange={this.handleValueChange}
                    fullWidth
                />
                </Grid>
                <Button className={classes.button} type="submit" variant="contained" color="primary">변경</Button>
                <Button className={classes.button} type="reset" variant="contained" color="primary">취소</Button>
              </Grid>
              </form>
            </Box>
          </Paper>
              {/* <label class="change_type"> 변경 유형 : </label>
              <select id="change_type_box">
                <option value="change_seat">좌석 변경</option>
                <option value="change_time">시간대 변경</option>
              </select>
              <br/>
              <label class="time_select"> 시간대 선택 : </label>
              <select name="show_times" class="show_time" onChange={this.handleValueChange}>
               {options.map(option => {
                   return <option value={option} key={option}>{option}</option>
               })}
              </select>
              <br/>
              <label class="change_seat_number"> 예매번호 : </label>
              <input type="text" class="change_seat_number_box" name="ticket_id" maxLength="10" value={this.state.ticket_id} onChange={this.handleValueChange}/>
              <br/>
              <label class="change_seat_number"> 변경 좌석번호 : </label>
              <input type="text" class="change_seat_number_box" name="seatNo" maxlength="5" value={this.state.seatNo} onChange={this.handleValueChange}/>
              <input type="text" class="change_seat_number_box" name="row" maxlength="5" value={this.state.row} onChange={this.handleValueChange}/>
              <input type="text" class="change_seat_number_box" name="column" maxlength="5" value={this.state.column} onChange={this.handleValueChange}/>
              <br/>
              <input type="submit" value="변경" /><br/>
              <input type="reset" value="취소"></input>
              <br/><br/>
              <br/> */}
          
          


          <br/>
          {/* <RefundInputForm
            onCreate={this.refundCreate}/>
          <br/> */}
          <Paper className={classes.paper}>
          <Box class="ticket_list_table">
          <h2>환불내역</h2>
          <label>전화번호 - </label>
          <InputBase
              placeholder="검색하기"
              name="searchKeyword2"
              value={this.state.searchKeyword2}
              onChange = {this.handleValueChange}
              inputProps={{ 'aria-label': 'search' }}
            />
            <Table >
            <TableHead>
              <TableRow>
                {cellList1.map(d => {
                  return <TableCell>{d}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.refunds ? filteredComponents2(this.state.refunds) :
              <TableRow>
                <TableCell colSpan="7" align ="center">
                  <CircularProgress  variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
      }
            </TableBody>
          </Table>
          </Box>
          </Paper>
          <br/>
          </div>
          </main>
    );
};
}

export default (withStyles)(styles)(TicketManagement);


