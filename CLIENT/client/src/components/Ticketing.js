import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import BootPay from "bootpay-js";
import '../css/ShowDetail.css';

const styles = theme => ({
    hidden: {
        display: 'none'
    },
    root: {
        background: 'rgb(33, 40, 48)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgb(220, 232, 245);',
    },
    label: {
        background: 'rgba(33, 40, 48, 10)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgb(220, 232, 245);',
    },
    value: {
        color:'black'
    }
});

class Ticketing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basic: 0,
            basicPrice: 0,
            child: 0,
            childPrice: 0,
            senior: 0,
            seniorPrice: 0,
            disabled: 0,
            disabledPrice: 0,
            merit: 0,
            meritPrice: 0,
            etc:0,
            etcPrice:0,
            price:0,
            pricetype:'',
            title:'',
            open: false
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.pricesCall()
      .then(res => this.setState({ pricetype: res }))
      .catch(err => console.log(err));
      this.titleCall()
      .then(res => this.setState({ title : res }))
      .catch(err => console.log(err));
      this.setState({
        user_id: decoded.user_id

    })
    }

    pricesCall = async () => {
        const response = await fetch('/api/prices/'+this.props.show_id);
        const body1 = await response.json();
        return body1
      }
      
    titleCall = async () => {
        const response = await fetch('/api/title/'+this.props.show_id);
        const body2 = await response.json();
        return body2
    }

    addAudience = () => {
        const url = '/api/audience/';
        var params = new URLSearchParams();
        params.append('basic', this.state.basic);
        params.append('child', this.state.child);
        params.append('senior', this.state.senior);
        params.append('disabled', this.state.disabled);
        params.append('merit', this.state.merit);
        params.append('etc', this.state.etc);
        params.append('basicPrice', this.state.basicPrice);
        params.append('childPrice', this.state.childPrice);
        params.append('seniorPrice', this.state.seniorPrice);
        params.append('disabledPrice', this.state.disabledPrice);
        params.append('meritPrice', this.state.meritPrice);
        params.append('etcPrice', this.state.etcPrice);
        params.append('show_id', this.props.show_id);
        params.append('user_id', this.state.user_id);
        axios.post(url, params)
        .then((Response) => {
         console.log(Response);   
        }).catch((ex)=>{
         console.log(ex);
        })
    }

    addTicketing = () => {
        const url = '/api/ticket/';
        var params = new URLSearchParams();
        params.append('user_id', this.state.user_id);
        params.append('show_id', this.props.show_id);
        params.append('price', this.state.price);
        axios.post(url, params)
        .then((Response) => {
         console.log(Response);   
        }).catch((ex)=>{
         console.log(ex);
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.state.price = this.state.basicPrice + this.state.childPrice+ this.state.seniorPrice +this.state.disabledPrice+this.state.meritPrice+this.state.etcPrice;
        
        this.addTicketing()
        this.addAudience()
        this.ticket();
        
        this.setState({
            basic: 0,
            child: 0,
            senior: 0,
            disabled: 0,
            merit: 0,
            etc:0,
            price:0,
            open: false
        })
    }
    
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = parseInt(e.target.value);
        switch(e.target.name) {
           case 'basic':
            nextState[e.target.name+"Price"] = parseInt(e.target.value) * parseInt(this.state.pricetype[0].audience1_price);
           break; 
           case 'child':
            nextState[e.target.name+"Price"] = parseInt(e.target.value) * parseInt(this.state.pricetype[0].audience2_price);
           break; 
           case 'senior':
            nextState[e.target.name+"Price"] = parseInt(e.target.value) * parseInt(this.state.pricetype[0].audience3_price);
           break; 
           case 'disabled':
            nextState[e.target.name+"Price"] = parseInt(e.target.value) * parseInt(this.state.pricetype[0].audience4_price);
           break; 
           case 'merit':
            nextState[e.target.name+"Price"] = parseInt(e.target.value) * parseInt(this.state.pricetype[0].audience5_price);
           break; 
           case 'etc':
            nextState[e.target.name+"Price"] = parseInt(e.target.value) * parseInt(this.state.pricetype[0].audience6_price);
           break; 
        }
        this.setState(nextState);
    }
        
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            basic: 0,
            basicPrice: 0,
            child: 0,
            childPrice: 0,
            senior: 0,
            seniorPrice: 0,
            disabled: 0,
            disabledPrice: 0,
            merit: 0,
            meritPrice: 0,
            etc:0,
            etcPrice:0,
            open: false
        })
    }

 
    render() {
        const { classes } = this.props;
        //const { classes } = styles();
        return (
            <div className="middle-nav">
                <Button variant="contained" color="black" onClick={this.handleClickOpen}>
                    예매
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <TextField classes={{root: classes.value}} label="일반" type="number" name="basic" value={this.state.basic} inputProps={{ min: "0", step: "1" }} onChange={this.handleValueChange} />명<br />
                        <TextField classes={{root: classes.value}} label="어린이" type="number" name="child" value={this.state.child} inputProps={{ min: "0", step: "1" }} onChange={this.handleValueChange} />명<br />
                        <TextField classes={{root: classes.value}} label="노인" type="number" name="senior" value={this.state.senior} inputProps={{ min: "0", step: "1" }} onChange={this.handleValueChange} />명<br />
                        <TextField classes={{root: classes.value}} label="장애인" type="number" name="disabled" value={this.state.disabled} inputProps={{ min: "0", step: "1" }} onChange={this.handleValueChange} />명<br />
                        <TextField classes={{root: classes.value}} label="유공자" type="number" name="merit" value={this.state.merit} inputProps={{ min: "0", step: "1" }} onChange={this.handleValueChange} />명<br />
                        <TextField classes={{root: classes.value}} label="기타" type="number" name="etc" value={this.state.etc} inputProps={{ min: "0", step: "1" }} onChange={this.handleValueChange} />명<br />
                        <TextField classes={{root: classes.value}} label="가격" type="number" name="price" 
                        value={this.state.basicPrice + this.state.childPrice+ this.state.seniorPrice +this.state.disabledPrice+this.state.meritPrice+this.state.etcPrice} />원<br />

                    </DialogContent>
                    <DialogActions>
                        <Button classes={{root: classes.root}} onClick={this.handleFormSubmit}>추가</Button>
                        <Button classes={{root: classes.label}} onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    ticket() {
        
        BootPay.request({
            price: this.state.price, //실제 결제되는 가격
            application_id: "59a4d323396fa607cbe75de4",
            name: this.state.title[0].show_title, //결제창에서 보여질 이름
            pg: 'kakao',
            method: 'easy', //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
            show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
            items: [
                {
                    item_name: this.state.title[0].show_title, //상품명
                    qty: 1, //수량
                    unique: '123', //해당 상품을 구분짓는 primary key
                    price: this.state.price, //상품 단가
                    cat1: 'TOP', // 대표 상품의 카테고리 상, 50글자 이내
                    cat2: '티셔츠', // 대표 상품의 카테고리 중, 50글자 이내
                    cat3: '라운드 티', // 대표상품의 카테고리 하, 50글자 이내
                }
            ],
            user_info: {
                username: '1',
                email: 'daniel0458@hanmail.net',
                addr: 'aaaa',
                phone: '010-1234-4567'
            },
            order_id: '1234', //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
            params: {callback1: ' 1', callback2: '2', customvar1234: 'customer'},
            account_expire_at: '2018-05-25', // 가상계좌 입금기간 제한 ( yyyy-mm-dd 포멧으로 입력해주세요. 가상계좌만 적용됩니다. )
            extra: {
                start_at: '2019-05-10', // 정기 결제 시작일 - 시작일을 지정하지 않으면 그 날 당일로부터 결제가 가능한 Billing key 지급
                end_at: '2022-05-10', // 정기결제 만료일 -  기간 없음 - 무제한
                vbank_result: 1, // 가상계좌 사용시 사용, 가상계좌 결과창을 볼지(1), 말지(0), 미설정시 봄(1)
                quota: '0,2,3' // 결제금액이 5만원 이상시 할부개월 허용범위를 설정할 수 있음, [0(일시불), 2개월, 3개월] 허용, 미설정시 12개월까지 허용
            }
        }).error(function (data) {
            //결제 진행시 에러가 발생하면 수행됩니다.
            console.log(data);
        }).cancel(function (data) {
            //결제가 취소되면 수행됩니다.
            console.log(data);
        }).ready(function (data) {
            // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
            console.log(data);
        }).confirm(function (data) {
            //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
            //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
            console.log(data);
            var enable = true; // 재고 수량 관리 로직 혹은 다른 처리
            if (enable) {
                BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
            } else {
                BootPay.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
            }
        }).close(function (data) {
            // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
            console.log(data);
        }).done(function (data) {
            //결제가 정상적으로 완료되면 수행됩니다
            //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
            console.log(data);
        });
    }
}
export default withStyles(styles)(Ticketing);