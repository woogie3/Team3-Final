import React, { Component } from 'react';
import QNAS from '../components/QNAS';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles, createMuiTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import HeaderMenu from '../components/HeaderMenu';


const theme = createMuiTheme({
  palette: {
    primary : {
      main: '#01579b',
    },
    secondary: {
      main: '#212121',
    }
  },
  overrides:{
    MuiTableCell:{
      head:{
        minWidth: 80,
        fontWeight: 'bolder',
        lineHeight: '1.5rem',
        maxWidth: 1000,
      },
      root:{
        textAlign: 'center',
        fontSize: '15px',
        paddingRight: '10px',
        paddingLeft: '10px',
        maxWidth: 1000,
      }
    },
  }
}
);

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      width: '100%',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    [theme.breakpoints.between('lg', 'xl') ]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      padding: theme.spacing(3),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    }
  },
});

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
    this.timer = setInterval(this.progress, 20);
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
    const { classes } = this.props;
    const cellList = ["글번호", "제목", "등록일", "아이디"];

    return (
      <ThemeProvider theme ={theme}>
        <HeaderMenu/>
      <main className={classes.layout}>
      <div>
        <Paper className={classes.paper}>
        <h2> 문의사항</h2>
        <div className="text-right">
        </div>
        <Table >   
          <TableHead>
            <TableRow>
              {cellList.map(c => {
                return <TableCell key={c.toString()} className={classes.tablecell}>{c}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>            
              {this.state.QNAS ? this.state.QNAS.map(c => {
                return (    
                  <QNAS stateRefresh={this.stateRefresh} key={c.QnA_id} QnA_id={c.QnA_id} QnA_title={c.QnA_title} user_id={c.user_id} QnA_content={c.QnA_content} QnA_date={c.QnA_date} order={c.order}/>
                 )}) : "no data"}
          </TableBody>
        </Table>
        {/* <button type="submit" onClick="QNAInsert"> 글쓰기</button> */}
        <Button href="/QNAInsert" className={classes.button} variant="contained" color="primary">글쓰기</Button>
        {/* <Button variant="contained" color="primary" onClick="./QnAInsert">글쓰기 </Button> */}
        {/* <Button variant="contained" color="black" onClick={(e) => {this.Change(this.props.user_id)}}>환불</Button> */}
      </Paper>
      </div>
      </main>
      </ThemeProvider>
    )
  }
}
export default withStyles(styles)(QNA);
