import React from 'react'; 
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class RefundListTable extends React.Component{
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.user_id}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.phone}</TableCell>
                <TableCell>{this.props.show_title}</TableCell>
                <TableCell>{this.props.show_time}</TableCell>
                <TableCell>{this.props.ticketing_id}</TableCell>
                <TableCell>{this.props.payment_type}</TableCell>
                <TableCell>{this.props.reason}</TableCell>
                
            </TableRow>
        )
    }
}
export default RefundListTable; 