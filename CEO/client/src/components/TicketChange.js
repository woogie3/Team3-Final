import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

class TicketChange extends React.Component {

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

    changeTicket(ticketing_id){
        const url = '/ticketings/changeSeat' + ticketing_id;
        fetch(url, {
           method: 'POST' 
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                    변경
                </Button>
                <Dialog onClose={this.handleClose} open={this.state.open}>
                    <DialogTitle onClose={this.handleClose}>
                        경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            변경하시겠습니까?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={(e) => {this.changeTicket(this.props.ticketing_id)}}>환불</Button>
                        <Button variant="outlined" color="secondary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default TicketChange;