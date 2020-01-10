import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

class TicketRefund extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          open: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen() {
        this.setState({
          open: true
        });
    }
    
    handleClose() {
        this.setState({
          open: false
        })
    }

    refundTicket(ticketing_id){
        const url = '/api/refunds/' + ticketing_id;
        fetch(url, {
           method: 'POST' 
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                    환불
                </Button>
                <Dialog onClose={this.handleClose} open={this.state.open}>
                    <DialogTitle onClose={this.handleClose}>
                        취소 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 예매표는 취소됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={(e) => {this.refundTicket(this.props.ticketing_id)}}>환불</Button>
                        <Button variant="outlined" color="secondary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default TicketRefund;