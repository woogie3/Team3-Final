import React, { Component } from 'react';
import MyShowList from '../components/MyShowList';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import jwt_decode from 'jwt-decode';
import '../css/MyShow.css'


class MyShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myshows: ''
    }
  }

  stateRefresh = () => {
   
    this.setState({
      myshows: '',
    });
    this.callApi()
      .then(res => this.setState({ myshows: res }))
      .catch(err => console.log(err));

  }
  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState ({
      user_id: decoded.user_id
    })
    this.callApi()
      .then(res => this.setState({ myshows: res }))
      .catch(err => console.log(err));
}
componentDidUpdate() {
  this.callApi()
  .then(res => this.setState({ myshows: res }))
  .catch(err => console.log(err));
}
  callApi = async () => {
    const response = await fetch('/api/myshows/' +this.state.user_id);
    const body = await response.json();
    return body
  }

render() {
 
  const cellList = ["공연", "예매일", "가격" , "환불신청"];
  
  return(
    <div>
      <Paper >
        <Table >
          <TableHead>
            <TableRow>
              {cellList.map(c => {
                return <TableCell key={c.toString()}>{c}</TableCell>
              })}
          
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.myshows ? this.state.myshows.map(c=> {
            return <MyShowList stateRefresh={this.stateRefresh} key={c.ticketing_id} ticketing_id={c.ticketing_id} show_id={c.show_id} ticketing_date={c.ticketing_date} price={c.price} refund_flag={c.refund_flag} />
          }) : "no data"}
        </TableBody>      
        </Table>
        </Paper>
    </div>
  )
}
}

export default MyShow;