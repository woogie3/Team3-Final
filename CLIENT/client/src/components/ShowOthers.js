import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { NavLink } from 'react-router-dom';

class ShowOthers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: '',
      page: 0,
      length: 0,
      show_id: this.props.match.params.show_id
    }
  }

  stateRefresh = () => {
    this.setState({
      show: '',
      page: 0,
      length: 0
    });
    this.callApi1()
      .then(res => this.setState({ show: res }))
      .catch(err => console.log(err));
    this.callApi2()
      .then(res => this.setState({ length: res.length }))
      .catch(err => console.log(err));
  }

  callApi1 = async () => {
    const response = await fetch('/api/showOthers/' + this.state.show_id + '/' + this.state.page);
    const body = await response.json();
    return body
  }

  callApi2 = async () => {
    const response = await fetch('/api/showOthersAll/' + this.state.show_id);
    const body2 = await response.json();
    return body2
  }
  componentDidMount() {
    this.callApi1()
      .then(res => this.setState({ show: res }))
      .catch(err => console.log(err));
    this.callApi2()
      .then(res => this.setState({ length: res.length }))
      .catch(err => console.log(err));
  }
  prevPage() {
    if (this.state.page > 0) {
      // this.setState({
      //   page: this.state.page-1
      //  });
      this.state.page = this.state.page - 1;
    }
    this.callApi1()
      .then(res => this.setState({ show: res }))
      .catch(err => console.log(err));
  }

  nextPage() {
    const rowsPerPage = 3;
    if (this.state.page < (this.state.length / rowsPerPage) - 1) {
      //  this.setState({
      //   page: this.state.page+1
      //  });
      this.state.page = this.state.page + 1;
    }
    this.callApi1()
      .then(res => this.setState({ show: res }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Paper>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>모든 상영작 </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              {/* <TableCell><NavLink to="/entireShowAll">+더보기</NavLink></TableCell> */}
            </TableRow>
            <TableRow>
              <TableCell className="left"><ArrowBackIosIcon onClick={() => this.prevPage()} /></TableCell>


              {this.state.show ? this.state.show.map(c => {
                return <TableCell className="show" key={c.show_id} >
                  <NavLink to={'/main/' + c.show_id + '/ShowInfo'}><img src={c.show_preview} alt={'사진없음'}></img></NavLink>
                </TableCell>
              }) : "no data"}

              <TableCell className="right"><ArrowForwardIosIcon onClick={() => this.nextPage()} /></TableCell>
            </TableRow>


          </TableBody>
        </Table>
      </Paper>
    )
  }
}
export default ShowOthers;