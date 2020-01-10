import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
    }
});


class RefundUpdate extends React.Component {
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

    RefundUpdate() {
        const url = '/api/myshowupdate/'+this.props.ticketing_id;
        fetch(url);
        this.setState({
            open: false
        }) 
    }

    
    render() {
        const { classes } = this.props;
        let button;
        let refund_flag = this.props.refund_flag;
        //console.log(refund_flag);
        if(refund_flag === "환불가능") {
            button = <Button variant="contained" color="black" onClick={this.handleClickOpen}>
             환불신청
         </Button>;
         } else {
             button = <Button variant="contained" color="white">
             환불완료
         </Button>
         }
        return (
            <div>
                {button}
                <Dialog onClose={this.handleClose} open={this.state.open}>
                    <DialogTitle onClose={this.handleClose}>
                        환불신청
                </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            환불하시겠습니까?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button classes={{root: classes.root}}  onClick={(e)=>{this.RefundUpdate()}}>환불</Button>

                        <Button classes={{root: classes.root}} variant="outlined" color="black" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}



export default withStyles(styles)(RefundUpdate);


