import React,{Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Select, MenuItem } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import DaumPostcode from 'react-daum-postcode';
import jwt_decode from 'jwt-decode';


const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("lg")]: {
          width: 'auto',
          marginLeft: theme.spacing(4),
          marginRight: theme.spacing(4),
        },
      },
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up("lg")]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          marginLeft: theme.spacing(4),
          marginRight: theme.spacing(4),
          padding: theme.spacing(3),
        }
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

class TroupAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            troup_name: '',
            troup_phone: '',
            bank_name: '',
            bank_account: '',
            kakao_account: '',
            seat_yn: 1,
            theater_name: '',
            troup_id: '',
            theater_location: '',
            latitude: '',
            longtitude: '',
            open: false,
            showPopup: false
            

        }
        this.handleDropdownChange=this.handleDropdownChange.bind(this);
        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
    }
    
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.axios();
        this.setState({
            user_id: '',
            troup_name: '',
            troup_phone: '',
            bank_name: '',
            bank_account: '',
            kakao_account: '',
            seat_yn: '',
            theater_name: '',
            troup_id: '',
            theater_location: '',
            latitude: '',
            longtitude: '',
            open: false
            
            

        })
        this.props.history.push('/ManagementMenu/troupManagement')

    }

    componentDidMount() {
        // usertoken으로 써야 작동함
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            user_id: decoded.user_id
        })
        this.getTroupid();
    }

    getTroupid = () => {
        let temp;
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            user_id: decoded.user_id
        })
        let params = new URLSearchParams()
        params.append('user_id', decoded.user_id)
        axios.post('/api/getuserid/', params)
        .then((Response) => {
            this.setState({troup_id: Response.data[0]['troup_id']})
            temp = Response.data[0]['troup_id']
        }).catch((err) => {
            console.log(err);
        })
    }

    
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    axios = () => {


        var params = new URLSearchParams();
        params.append('user_id', this.state.user_id)
        params.append('troup_name', this.state.troup_name)
        params.append('troup_phone',this.state.troup_phone)
        params.append('bank_name',this.state.bank_name)
        params.append('bank_account',this.state.bank_account)
        params.append('kakao_account',this.state.kakao_account)
        params.append('seat_yn',this.state.seat_yn)
        
        axios.post('/api/troupManagementAdd1',params)
        .then((Response) => {
            console.log(Response);
        }).catch((ex) =>{
            console.log(ex);
        })




        var param = new URLSearchParams();
        console.log("axios  troup_id : " + this.state.troup_id)
        param.append('troup_id', this.state.troup_id)
        param.append('theater_name', this.state.theater_name)
        param.append('theater_location',this.state.theater_location)
        param.append('latitude',this.state.latitude)
        param.append('longtitude',this.state.longtitude)
        
        
   
        axios.post('/api/troupManagementAdd2',param)
        .then((Response) => {
            console.log(Response);
        }).catch((ex) =>{
            console.log(ex);
        })
        
    }

    

     
     handleDropdownChange(e) {
        this.setState({bank_name : e.target.value });
      }




    page=()=>{
       this.props.history.push('/')

    }



    handleClickOpen() {
        this.setState({
            open: true
        });
    }


    handleClose() {
        this.setState({
            open: false
        });
    }
    handleAddress = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        let postcode=data.zonecode;
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        this.setState({theater_location:data.address});
        

        console.log(postcode+"  "+fullAddress); 
        this.togglePopup();
   

      }
      togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup  
        });  
         }


    render() {
        const {classes} = this.props;
        return(
            <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom>
                        극단 등록
                    </Typography>
                    <form onSubmit={this.handleFormSubmit}>
                {/* <h1>극단 등록</h1>
                사장님 아이디: <input type="text" name="user_id" value={this.state.user_id} onChange={this.handleValueChange}/><br/>
                극단 이름: <input type="text" name="troup_name" value={this.state.troup_name} onChange={this.handleValueChange}/><br/>
                전화번호: <input type="text" name="troup_phone" value={this.state.troup_phone} onChange={this.handleValueChange}/><br/>
                계좌번호: <select id = "dropdown" onChange={this.handleDropdownChange}>
                        <option value="N/A">은행명</option>
                        <option value="신한은행">신한은행</option>
                        <option value="국민은행">국민은행</option>
                        <option value="우리은행">우리은행</option>
                        <option value="기업은행">기업은행</option>
                        </select> <input type="text" name="bank_account" value={this.state.bank_account} onChange={this.handleValueChange}/><br/>
                
                카카오ID: <input type="text" name="kakao_account" value={this.state.kakao_account} onChange={this.handleValueChange}/><br/>
                좌석제 여부: <input type="radio" name="seat_yn" value='1' onChange={this.handleValueChange}/>yes <input type="radio" name="seat_yn" value='0' onChange={this.handleValueChange}/>no<br/>


                극단 아이디: <input type="text" name="troup_id" value={this.state.troup_id} onChange={this.handleValueChange}/><br/>
                극장 이름: <input type="text" name="theater_name" value={this.state.theater_name} onChange={this.handleValueChange}/><br/>
                극장 위치: <input type="text" name="theater_location" value={this.state.theater_location} onChange={this.handleValueChange}/><br/>
                위도/경도: <input type="text" name="latitude" value={this.state.latitude} onChange={this.handleValueChange}/> <input type="text" name="longtitude" value={this.state.longtitude} onChange={this.handleValueChange}/><br/>
                행/열: <input type="text" name="entire_row" value={this.state.entire_row} onChange={this.handleValueChange}/> <input type="text" name="entire_column" value={this.state.entire_column} onChange={this.handleValueChange}/><br/> */}

                        <Grid container spacing={3}>
                            {/* <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="user_id"
                                name="user_id"
                                label="사장님 아이디"
                                value={this.state.user_id}
                                onChange={this.handleValueChange}
                                fullWidth
                            />
                            </Grid> */}
                            <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="troup_name"
                                name="troup_name"
                                label="극단 이름"
                                value={this.state.troup_name}
                                onChange={this.handleValueChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="troup_phone"
                                name="troup_phone"
                                label="전화번호"
                                value={this.state.troup_phone}
                                onChange={this.handleValueChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">은행명</InputLabel>
                            <Select
                                required
                                className={classes.selectEmpty}
                                id="bank_name"
                                labelId="은행명"
                                name="bank_name"
                                displayEmpty
                                value={this.state.bank_name}
                                onChange={this.handleDropdownChange}
                                fullWidth
                            >
                                <MenuItem value="신한은행">신한은행</MenuItem>
                                <MenuItem value="국민은행">국민은행</MenuItem>
                                <MenuItem value="우리은행">우리은행</MenuItem>
                                <MenuItem value="하나은행">하나은행</MenuItem>
                                <MenuItem value="제일은행">제일은행</MenuItem>
                                <MenuItem value="농협">농협</MenuItem>
                            </Select>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="bank_account"
                                name="bank_account"
                                label="계좌 번호"
                                value={this.state.bank_account}
                                onChange={this.handleValueChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="kakao_account"
                                name="kakao_account"
                                label="카카오 ID"
                                value={this.state.kakao_account}
                                onChange={this.handleValueChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="theater_name"
                                name="theater_name"
                                label="극장이름"
                                value={this.state.theater_name}
                                onChange={this.handleValueChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="theater_location"
                                name="theater_location"
                                label="극장위치"
                                value={this.state.theater_location}
                                onChange={this.handleValueChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                            <TextField
                                required
                                id="latitude"
                                name="latitude"
                                label="위도"
                                value={this.state.latitude}
                                onChange={this.handleValueChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                            <TextField
                                required
                                id="longtitude"
                                name="longtitude"
                                label="경도"
                                value={this.state.longtitude}
                                onChange={this.handleValueChange}
                                fullWidth
                            />
                            </Grid>
                </Grid>
                </form>

                <div><Button className="c" variant="contained" color="primary" onClick={this.togglePopup.bind(this)}> 우편번호검색</Button>
                {this.state.showPopup ?  
                <DaumPostcode
                        onComplete={this.handleAddress}
                /> 
                : null  
                }<br/>
                </div>
                            
                            
                    <Grid>
                    <Button variant="contained" color="primary" onClick={this.handleClickOpen} className={classes.button}>등록</Button>
                    <Dialog open={this.state.open} onClose={this.handleClose}>
                        <DialogTitle onClose={this.handleClose}>극단을 등록하시겠습니까?</DialogTitle>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>등록</Button>
                            <Button variant="contained" color="primary" onClick={this.handleClose}>취소</Button>
                        </DialogActions>
                    </Dialog>
                    <Button variant="contained" color="primary" onClick={this.page} className={classes.button}>취소</Button>
                    </Grid>



                </Paper>
              </main>
            </React.Fragment>
        )
    
    }
    
   
}

export default withRouter((withStyles)(styles)(TroupAdd));