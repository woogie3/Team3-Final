import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ShowDetail from '../components/ShowDetail';
import { Link, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Slideshow from '../components/Slide';
import '../css/Home.css'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show1: '',
      show2:'',
      romanPage:0,
      page: 0,
      show_id:'',
      length: 0,
      romanLength:0
    }
    this.stateRefresh = this.stateRefresh.bind(this);

  }

  stateRefresh = () => {
    this.setState({
      show1: '',
      show2:'',
      romanPage:0,
      page: 0,
      show_id:'',
      length: 0,
      romanLength:0
    });

    this.showAll()
      .then(res => this.setState({ show1: res }))
      .catch(err => console.log(err));
      this.countShowAll()
      .then(res => this.setState({ length: res.length }))
      .catch(err => console.log(err));
      this.showRomance()
      .then(res => this.setState({ show2: res }))
      .catch(err => console.log(err));
      this.countShowRomance()
      .then(res => this.setState({ romanLength: res.length }))
      .catch(err => console.log(err));
  }
  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    
    this.state.user_id = decoded.user_id;

    this.showAll()
      .then(res => this.setState({ show1: res }))
      .catch(err => console.log(err));
      this.countShowAll()
      .then(res => this.setState({ length: res.length }))
      .catch(err => console.log(err));
      console.log(this.state.user_id)
      this.showRomance()
      .then(res => this.setState({ show2: res }))
      .catch(err => console.log(err));
      this.countShowRomance()
      .then(res => this.setState({ romanLength: res.length }))
      .catch(err => console.log(err));
      console.log(this.state.user_id)
  }
  

  showAll = async () => {
    
    const response = await fetch('/api/showAll/'+this.state.user_id);
    const body1 = await response.json();
    return body1
  }
  countShowAll = async () => {
    const response = await fetch('/api/countShowAll/'+this.state.user_id);
    const body2 = await response.json();
    return body2
  }
  showAllMove = async () => {
    const response = await fetch('/api/showAll/'+this.state.user_id+'/'+this.state.page);
    const body3 = await response.json();
    return body3
  }
  

  showRomance = async () => {
    
    const response = await fetch('/api/showRomance/'+this.state.user_id);
    const body1 = await response.json();
    return body1
  }
  countShowRomance = async () => {
    const response = await fetch('/api/countShowRomance/'+this.state.user_id);
    const body2 = await response.json();
    return body2
  }
  showRomanceMove = async () => {
    const response = await fetch('/api/showRomance/'+this.state.user_id+'/'+this.state.romanPage);
    const body3 = await response.json();
    return body3
  }
  


  chooseShow(id) {
    this.setState({
      show_id : id
    })
  }
  
  close = (e) => {
    if(document.getElementById(e.target.id).parentNode.parentNode.parentNode.parentNode.getAttribute("aria-expanded") === "true") {
      window.location.href='/main/';
    }
  }


  prevPage(genre) {
     
    switch(genre) {
      case "all": {
        if(this.state.page > 0) {
          // this.setState({
            //   page: this.state.page-1
            //  });
            this.state.page = this.state.page-1;
          }
        this.showAllMove()
        .then(res => this.setState({ show1: res}))
        .catch(err => console.log(err));
        break;
      }
      case "Romance": {
        if(this.state.romanPage > 0) {
          // this.setState({
            //   page: this.state.page-1
            //  });
            this.state.romanPage = this.state.romanPage-1;
          }
        this.showRomanceMove()
        .then(res => this.setState({ show2: res}))
        .catch(err => console.log(err));
        break;
      }
    }
   
  }

  nextPage(genre) {
    const rowsPerPage = 3;
   
    switch(genre) {
      case "all": {
        if(this.state.page < Math.ceil(this.state.length/rowsPerPage)-1) {
          // this.setState({
          //   page: this.state.page+1
          //  });
          this.state.page = this.state.page+1;
        }
        this.showAllMove()
        .then(res => this.setState({ show1: res}))
        .catch(err => console.log(err));
        break;
      }
      case "Romance": {
        console.log(this.state.romanLength)
        console.log( this.state.romanPage)
      
        if(this.state.romanPage < Math.ceil(this.state.romanLength/rowsPerPage)-1) {
          // this.setState({
          //   page: this.state.page+1
          //  });
          this.state.romanPage = this.state.romanPage+1;
        }
        this.showRomanceMove()
        .then(res => this.setState({ show2: res}))
        .catch(err => console.log(err));
        break;
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Slideshow></Slideshow>
        <Paper>
          <Table>
            <TableBody>
             <TableRow>
                <TableCell></TableCell>
                <TableCell>모든 상영작</TableCell>
                <TableCell></TableCell>
                {/* <TableCell><NavLink to="/entireShowAll">+더보기</NavLink></TableCell> */}
              </TableRow>
              <TableRow>
              <TableCell className="left"><ArrowBackIosIcon onClick={()=>this.prevPage("all")}/></TableCell>
                <ExpansionPanel>
                <ExpansionPanelSummary onClick={(e)=>this.close(e)}>
                    {this.state.show1 ? this.state.show1.map(c => {
                      return <TableCell className="show" key={c.show_id} >
                        <Link to={'/main/'+c.show_id+'/ShowInfo'}><img  id="all"  src={c.show_preview} alt={'사진없음'} ></img></Link>
                      </TableCell>
                    }) : "no data"}
                  </ExpansionPanelSummary>
                  <Route path="/main/:show_id/:page" component={ShowDetail}/>
                </ExpansionPanel>
                <TableCell className="right"><ArrowForwardIosIcon onClick={()=>this.nextPage("all")}/></TableCell>
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                <TableCell>로맨스</TableCell>
                <TableCell></TableCell>
                {/* <TableCell><NavLink to="/entireShowAll">+더보기</NavLink></TableCell> */}
              </TableRow>
              <TableRow>
              <TableCell className="left"><ArrowBackIosIcon onClick={()=>this.prevPage("Romance")}/></TableCell>
                <ExpansionPanel>
                <ExpansionPanelSummary onClick={(e)=>this.close(e)}>
                    {this.state.show2 ? this.state.show2.map(c => {
                      return <TableCell className="show" key={c.show_id} >
                        <Link to={'/main/'+c.show_id+'/ShowInfo'}><img id="ramance" src={c.show_preview} alt={'사진없음'} ></img></Link>
                      </TableCell>
                    }) : "no data"}
                  </ExpansionPanelSummary>
                  <Route path="/main/:show_id/:page" component={ShowDetail}/>
                </ExpansionPanel>
                <TableCell className="right"><ArrowForwardIosIcon onClick={()=>this.nextPage("Romance")}/></TableCell>
              </TableRow>


            </TableBody>
          </Table>
        </Paper>
        </React.Fragment>
    )
  }

}

export default Home;