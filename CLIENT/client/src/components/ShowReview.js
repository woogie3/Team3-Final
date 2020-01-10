import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import '../css/ShowReview.css'

class ShowReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id:'',
            review: '',
            review_content: '',
            review_grade: '',
            show_id: this.props.match.params.show_id
        }
    }
    
    axios = () =>{
        var params = new URLSearchParams();
        params.append('user_id',this.state.user_id);
        params.append('review_content', this.state.review_content);
        params.append('review_grade', this.state.review_grade);
        params.append('show_id',this.state.show_id)
        console.log(this.state.show_id);
        axios.post('/api/insertReview', params)
        .then((Response) => {
         console.log(Response);   
        }).catch((ex)=>{
         console.log(ex);
        })
        
    }


    handleFormSubmit = (e) => {
        e.preventDefault()
        this.axios();
        this.stateRefresh();
    }


    stateRefresh = () => {
        this.setState({
            review: '',
            review_content: '',
            review_grade: ''
        });
        this.callApi1()
            .then(res => this.setState({ review: res }))
            .catch(err => console.log(err));
    }

    callApi1 = async () => {
        let show_id = this.props.match.params.show_id;
        const response = await fetch('/api/showReview/' + show_id);
        const body = await response.json();
        return body
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.callApi1()
            .then(res => this.setState({ review: res }))
            .catch(err => console.log(err))
        this.setState({
            user_id: decoded.user_id
        })
    }
    componentDidUpdate() {
        this.callApi1()
            .then(res => this.setState({ review: res }))
            .catch(err => console.log(err))
    }
    render() {
        return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>아이디</TableCell>
                            <TableCell>리뷰내용</TableCell>
                            <TableCell>평점</TableCell>
                            <TableCell></TableCell>
                            </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.review ? this.state.review.map(c => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        <Typography>
                                            {c.user_id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {c.review_content}
                                    </TableCell>
                                    <TableCell>
                                        {c.review_grade}
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>)
                        }) : "no data"}
                        <TableRow>
                                <TableCell>
                                    아이디
                                </TableCell>
                                <TableCell>
                                <TextField type="text" name="review_content" value={this.state.review_content} onChange={this.handleValueChange} /><br />
                                    {/* <input type="text" name="review_content" value="내용" /> */}
                                </TableCell>
                                <TableCell>
                                <TextField className="review_grade" type="number" name="review_grade" inputProps={{ min: "0", max: "5", step: "0.5" }} value={this.state.review_grade} onChange={this.handleValueChange} />/5<br />
                                    {/* <input type="number" name="review_grade" min="0" max="5" step="0.1" value="3" />/5 */}
                                    </TableCell>
                                    <TableCell>
                                    <Button variant="contained" color="black" onClick={this.handleFormSubmit}>추가</Button>
                                    </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
        )
    }
}

export default withRouter(ShowReview);