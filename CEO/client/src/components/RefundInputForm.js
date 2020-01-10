import { Box } from "@material-ui/core";
import React from 'react'; 

class RefundInputForm extends React.Component{
    state={
        contents : '',
        payment_type : ''
    }
    refundInteract = (e) => {
        this.setState({
            [e.target.contents] : e.target.value,
            [e.target.payment_type] : e.target.value
        })
    }
    refundSubmit = (e) => {
        //페이지 리로딩 방지
        e.preventDefault();
        //상태값을 onCreate를 통해 TicketManagement로 전달
        this.props.onCreate(this.state);
        //상태초기화
        this.setState({
            contents: '',
            payment_type: ''
        })
    }
    render(){
        return(
            <div>
                <Box>
                <h1><strong>환불</strong></h1>
                <br/>
                <label class="refund_reason_type">환불 유형</label>
                <br/>
                <select id="refund_type_box">
                    <option value={this.state.contents} onChange={this.refundInteract} name="contents">단순변심</option>
                    <option value={this.state.contents} onChange={this.refundInteract} name="contents">공연 진행 차질</option>
                    <option value={this.state.contents} onChange={this.refundInteract} name="contents">다른 공연으로 변경</option>
                    <option value={this.state.contents} onChange={this.refundInteract} name="contents">기타(no-show 등)</option>
                </select>
                <br/>
                <textarea name="contents" rows="7" cols="35" wrap="virtual"> 원하는 내용을 입력해주세요</textarea>
                <br/>
                <label class="payment_type">환불 방식</label>
                <br/>
                <select id="payment_type_box">
                    <option value={this.state.payment_type} onChange={this.refundInteract} name="payment_type">카카오페이</option>
                    <option value={this.state.payment_type} onChange={this.refundInteract} name="payment_type">카드</option>
                    <option value={this.state.payment_type} onChange={this.refundInteract} name="payment_type">현금</option>
                </select>
                <br/>
                <button type="submit">확인</button>
                <input type="reset" value="취소"></input>
                </Box>
            </div>
        )
    }
}
export default RefundInputForm;