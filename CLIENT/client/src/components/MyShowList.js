import React from 'react'; 
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import RefundUpdate from './RefundUpdate';

class MyShowList extends React.Component{
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.show_id}</TableCell>
                <TableCell>{this.props.ticketing_date}</TableCell>
                <TableCell>{this.props.price}</TableCell>
                <TableCell><RefundUpdate refund_flag = {this.props.refund_flag} ticketing_id={this.props.ticketing_id}/></TableCell>
                {/* <TableCell><Button>신창하기</Button></TableCell> */}
            </TableRow>
        )
    }
}
export default MyShowList; 