import React,{Component} from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Select, MenuItem } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import jwt_decode from 'jwt-decode';
import '../css/ShowAdd.css';



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

class ShowAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id:'',
            troup_id: '',
            genre_id:'',
            show_id:'',
            show_title: '',
            start_date: '',
            end_date: '',
            show_preview: '',
            show_content: '',
            show_time: '',
            show_length: '',
            audience1_price: '',
            audience2_price: '',
            audience3_price: '',
            audience4_price: '',
            audience5_price: '',
            audience6_price: '',
            file: null,
            fileName: '',
            open: false
            
            

        }
        this.handleDropdownChange=this.handleDropdownChange.bind(this);
        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
    }
    
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.axios();
        this.setState({
            troup_id: '',
            genre_id: '',
            show_id: '',
            show_title: '',
            start_date: '',
            end_date: '',
            show_preview: '',
            show_content: '',
            show_time: '',
            show_length: '',
            audience1_price: '',
            audience2_price: '',
            audience3_price: '',
            audience4_price: '',
            audience5_price: '',
            audience6_price: '',
            file: null,
            fileName: '',
            open: false

        })
        this.addCustomer();
    }



    componentDidMount() {
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
            this.getShowid(temp);
        }).catch((err) => {
            console.log(err);
        })
    }

    getShowid = (aa) => {
        let a;
        let params = new URLSearchParams()
        params.append('troup_id', aa)
        axios.post('/api/getshowid/', params)
        .then((Response) => {
            console.log(Response.data);
            a = Response.data[0]['show_id'];
            for(let i = 0;i<Response.data.length; i++){
                if(Response.data[i]['show_id'] < Response.data[i+1]['show_id']){
                    a = Response.data[i+1]['show_id'];
                }
                if(i === Response.data.length-2){
                    break;
                }
            }
            console.log(a)
            console.log("res:" + Response.data)
            this.setState({show_id : a});
            

        }).catch((err) => {
            console.log(err);
        })
    }


    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })

    }


    
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/showManagementAddShow';
        const formData = new FormData();
        formData.append('troup_id',this.state.troup_id)
        formData.append('genre_id',this.state.genre_id)
        formData.append('show_title',this.state.show_title)
        formData.append('start_date',this.state.start_date)
        formData.append('end_date',this.state.end_date)
        formData.append('image',this.state.file)
        formData.append('show_content',this.state.show_content)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url,formData,config);
    } 

    axios = () => {
console.log(this.state.show_id)
        var paramsSD = new URLSearchParams();
        paramsSD.append('show_id',this.state.show_id)
        paramsSD.append('show_time',this.state.show_time)
        paramsSD.append('show_length',this.state.show_length)
   
        axios.post('/api/showManagementAddShowDate',paramsSD)
        .then((Response) => {
            console.log(Response);
        }).catch((ex) =>{
            console.log(ex);
        })



        var paramsAP = new URLSearchParams();
        paramsAP.append('show_id', this.state.show_id)
        paramsAP.append('audience1_price',this.state.audience1_price)
        paramsAP.append('audience2_price',this.state.audience2_price)
        paramsAP.append('audience3_price',this.state.audience3_price)
        paramsAP.append('audience4_price',this.state.audience4_price)
        paramsAP.append('audience5_price',this.state.audience5_price)
        paramsAP.append('audience6_price',this.state.audience6_price)
   
        axios.post('/api/showManagementAddAudiencePrice',paramsAP)
        .then((Response) => {
            console.log(Response);
        }).catch((ex) =>{
            console.log(ex);
        })
        
    }


     
    handleDropdownChange(e) {
        this.setState({genre_id : e.target.value });
      }

    handleDropdownChange2(e) {
        this.setState({show_length : e.target.value });
      }


      page=()=>{
        this.props.history.push('/ManagementMenu/showManagement')
     }


    page2=()=>{
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



    render() {
        const {classes} = this.props;
        return(
 
            // <div>
            // <form onSubmit={this.handleFormSubmit}>
            //     <h1>상영작 등록</h1>
            //     극단번호:<input type="text" name="troup_id" value={this.state.troup_id} onChange={this.handleValueChange}/><br/>
            //     공연번호:<input type="text" name="show_id" value={this.state.show_id} onChange={this.handleValueChange}/><br/>
            //     장르번호:<input type="text" name="genre_id" value={this.state.genre_id} onChange={this.handleValueChange}/><br/>
            //     공연제목: <input type="text" name="show_title" value={this.state.show_title} onChange={this.handleValueChange}/><br/>
            //     공연일자: <input type="date" name="start_date" value={this.state.start_date} onChange={this.handleValueChange}/> <input type="date" name="end_date" value={this.state.end_date} onChange={this.handleValueChange}/><br/>
            //     공연시간: <input type="text" name="show_time" value={this.state.show_time} onChange={this.handleValueChange}/><br/>
            //     런닝타임: <input type="text" name="show_length" value={this.state.show_length} onChange={this.handleValueChange}/><br/>
            //     장르/설명: <select id = "dropdown" onChange={this.handleDropdownChange}>
            //             <option value="N/A">장르명</option>
            //             <option value="로맨스">로맨스</option>
            //             <option value="스릴러">스릴러</option>
            //             <option value="코믹">코믹</option>
            //             <option value="드라마">드라마</option>
            //             </select> <input type="text" name="genre_content" value={this.state.genre_content} onChange={this.handleValueChange}/><br/>
            //     공연설명: <input type="text" name="show_content" value={this.state.show_content} onChange={this.handleValueChange}/><br/>
            //     공연사진첨부: <input type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
            //     공연영상첨부: <input type="text" name="show_preview" value={this.state.show_preview} onChange={this.handleValueChange}/><br/>
            //     <h2>가격 입력</h2>
            //     일반: <input type="text" name="audience1_price" value={this.state.audience1_price} onChange={this.handleValueChange}/><br/>
            //     어린이: <input type="text" name="audience2_price" value={this.state.audience2_price} onChange={this.handleValueChange}/><br/>
            //     노인: <input type="text" name="audience3_price" value={this.state.audience3_price} onChange={this.handleValueChange}/><br/>
            //     장애인: <input type="text" name="audience4_price" value={this.state.audience4_price} onChange={this.handleValueChange}/><br/>
            //     유공자: <input type="text" name="audience5_price" value={this.state.audience5_price} onChange={this.handleValueChange}/><br/>
            //     기타: <input type="text" name="audience6_price" value={this.state.audience6_price} onChange={this.handleValueChange}/><br/>
                

            //     <Button variant="contained" color="primary" onClick={this.handleClickOpen}>등록</Button>
            //     <Dialog open={this.state.open} onClose={this.handleClose}>
            //         <DialogTitle onClose={this.handleClose}>상영작을 등록하시겠습니까? 등록 후 확인창을 눌러주세요.</DialogTitle>
            //         <DialogActions>
            //             <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>등록</Button>
            //             <Button variant="contained" color="primary" onClick={this.handleClose}>취소</Button>
            //         </DialogActions>
            //     </Dialog>
            //     <Button variant="contained" color="primary" onClick={this.page}>확인</Button>
            //     <Button variant="contained" color="primary" onClick={this.page2}>취소</Button>
            // </form>
            // </div> 
            <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom>
                        상영작 등록
                    </Typography>
                    
                    <form onSubmit={this.handleFormSubmit}>
                    <Grid container spacing={3}>

                    
                        <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="show_title"
                            name="show_title"
                            label="공연 제목"
                            value={this.state.show_title}
                            onChange={this.handleValueChange}
                            fullWidth
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            type="date"
                            id="start_date"
                            name="start_date"
                            label="공연일자 시작"
                            defaultValue= "2020-01-10"
                            InputLabelProps={{shrink:true}}
                            value={this.state.start_date}
                            onChange={this.handleValueChange}
                            fullWidth
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            type="date"
                            id="end_date"
                            name="end_date"
                            label="공연일자 종료"
                            defaultValue= "2020-01-10"
                            InputLabelProps={{shrink:true}}
                            value={this.state.end_date}
                            onChange={this.handleValueChange}
                            fullWidth
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="show_time"
                            name="show_time"
                            label="공연 시간"
                            value={this.state.show_time}
                            onChange={this.handleValueChange}
                            fullWidth
                        />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">런닝타임</InputLabel>
                        <Select
                            required
                            className={classes.selectEmpty}
                            id="show_length"
                            labelId="show_length"
                            name="show_length"
                            displayEmpty
                            value={this.state.show_length}
                            onChange={this.handleValueChange}
                            fullWidth
                        >
                            <MenuItem value="01:00:00">1시간</MenuItem>
                            <MenuItem value="01:30:00">1시간30분</MenuItem>
                            <MenuItem value="02:00:00">2시간</MenuItem>
                            <MenuItem value="02:30:00">2시간30분</MenuItem>
                            <MenuItem value="03:00:00">3시간</MenuItem>
                            <MenuItem value="03:30:00">3시간30분</MenuItem>
                            <MenuItem value="04:00:00">4시간</MenuItem>
                            <MenuItem value="04:30:00">4시간30분</MenuItem>
                            <MenuItem value="05:00:00">5시간</MenuItem>
                            <MenuItem value="05:30:00">5시간30분</MenuItem>
                            <MenuItem value="06:00:00">6시간</MenuItem>
                            
                        </Select>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">공연 장르</InputLabel>
                        <Select
                            required
                            className={classes.selectEmpty}
                            id="genre_id"
                            labelId="genre_id"
                            name="genre_id"
                            displayEmpty
                            value={this.state.genre_id}
                            onChange={this.handleDropdownChange}
                            fullWidth
                        >
                            <MenuItem value="1">로맨스</MenuItem>
                            <MenuItem value="2">멜로</MenuItem>
                            <MenuItem value="3">호러</MenuItem>
                            <MenuItem value="4">액션</MenuItem>
                            <MenuItem value="5">코믹</MenuItem>
                            <MenuItem value="6">19금</MenuItem>
                            <MenuItem value="7">유아</MenuItem>
                            <MenuItem value="8">드라마</MenuItem>
                            <MenuItem value="9">휴머니티</MenuItem>
                            <MenuItem value="10">블랙코미디</MenuItem>
                            <MenuItem value="11">가족</MenuItem>
                            <MenuItem value="12">뮤지컬</MenuItem>
                        </Select>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                        <Button
                        variant="contained"
                        component="label"
                        color="primary"
                        align = "center"
                        >
                            <Typography>{"공연사진첨부"}</Typography>
                            <input id={"file-input"} style={{display:'none'}} type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
                        </Button>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="show_content"
                            name="show_content"
                            label="공연 설명"
                            value={this.state.show_content}
                            onChange={this.handleValueChange}
                            fullWidth
                        />
                        </Grid>
                       
                        <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id="audience1_price"
                            name="audience1_price"
                            label="일반가격"
                            value={this.state.audience1_price}
                            onChange={this.handleValueChange}
                            fullWidth
                        />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id="audience2_price"
                            name="audience2_price"
                            label="어린이가격"
                            value={this.state.audience2_price}
                            onChange={this.handleValueChange}
                            fullWidth
                        />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id="audience3_price"
                            name="audience3_price"
                            label="노인가격"
                            value={this.state.audience3_price}
                            onChange={this.handleValueChange}
                            fullWidth
                        />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id="audience4_price"
                            name="audience4_price"
                            label="장애인가격"
                            value={this.state.audience4_price}
                            onChange={this.handleValueChange}
                            fullWidth
                        />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id="audience5_price"
                            name="audience5_price"
                            label="유공자가격"
                            value={this.state.audience5_price}
                            onChange={this.handleValueChange}
                            fullWidth
                        />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id="audience6_price"
                            name="audience6_price"
                            label="기타"
                            value={this.state.audience6_price}
                            onChange={this.handleValueChange}
                            fullWidth
                        />
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" onClick={this.handleClickOpen} className={classes.button}>등록</Button>
                    <Dialog open={this.state.open} onClose={this.handleClose}>
                        <DialogTitle onClose={this.handleClose}>상영작을 등록하시겠습니까? 등록 후 확인창을 눌러주세요.</DialogTitle>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>등록</Button>
                            <Button variant="contained" color="primary" onClick={this.handleClose}>취소</Button>
                        </DialogActions>
                    </Dialog>
                    <Button variant="contained" color="primary" onClick={this.page} className={classes.button}>확인</Button>
                    <Button variant="contained" color="primary" onClick={this.page2} className={classes.button}>취소</Button>
                    </form>
                </Paper>
              </main>
              </React.Fragment>
            
        )
    
    }
    
   
}

export default withRouter((withStyles)(styles)(ShowAdd));