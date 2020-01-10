import React, { Component } from 'react';
import QNAS from '../components/QNAS';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import '../css/QNAS.css'

class QNA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      QNAS: '',
      completed: 0
    }
    this.stateRefresh = this.stateRefresh.bind(this);
  }

  stateRefresh = () => {
    this.setState({
      QNAS: '',
      completed: 0
    });

    this.callApi()
      .then(res => this.setState({ QNAS: res }))
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ QNAS: res }))
      .catch(err => console.log(err));
  }
  componentDidUpdate() {
    this.callApi()
      .then(res => this.setState({ QNAS: res }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/QNAS');
    const body = await response.json();
    return body
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }
  handleValueChange = (e) => {
    let nextState = {}
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  handleClickOpen = () => {
    this.setState({
      open: true
    });

  }


  render() {
    const cellList = ["글번호", "제목", " ", "등록일", "아이디"];

    return (
      <div>
        <h2> 문의사항</h2>
        <div className="text-right">
        <Link to="/QNAInsert" >글쓰기</Link>
        </div>
        <Table>   
          <TableHead>
            <TableRow>
              {cellList.map(c => {
                return <TableCell key={c.toString()}>{c}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>            
              {this.state.QNAS ? this.state.QNAS.map(c => {
                return (    
                <QNAS stateRefresh={this.stateRefresh} key={c.QnA_id} QnA_id={c.QnA_id}  QnA_title={c.QnA_title} user_id={c.user_id} QnA_content={c.QnA_content} QnA_date={c.QnA_date} QnA_views={c.QnA_views} />   
                 )}) : "no data"}
          </TableBody>
        </Table>
       
        {/* <button type="submit" onClick="QNAInsert"> 글쓰기</button> */}
        {/* <Button variant="contained" color="primary" onClick="./QnAInsert">글쓰기 </Button> */}
        {/* <Button variant="contained" color="black" onClick={(e) => {this.Change(this.props.user_id)}}>환불</Button> */}
      </div>
    )
  }
}
export default QNA;
