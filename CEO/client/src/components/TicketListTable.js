import React from 'react'; 
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TicketRefund from './TicketRefund';

class TicketListTable extends React.Component{
    render(){
        return(
            <TableRow >
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.user_id}</TableCell>
                <TableCell>{this.props.ticketing_id}</TableCell>
                <TableCell>{this.props.phone}</TableCell>
                <TableCell>{this.props.show_title}</TableCell>
                <TableCell>{this.props.show_time}</TableCell>
                <TableCell>{this.props.keys}</TableCell>
                <TableCell>{this.props.ticketing_date}</TableCell>
                <TableCell><TicketRefund stateRefresh={this.props.stateRefresh} ticketing_id={this.props.ticketing_id}/></TableCell>
            </TableRow>
        )
    }
}
export default TicketListTable; 