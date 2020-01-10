import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class TroupManagementTable extends React.Component {
    render() {
        return (
            <TableRow>
                
                <TableCell>{this.props.user_id}</TableCell>
                <TableCell>{this.props.troup_name}</TableCell>
                <TableCell>{this.props.troup_phone}</TableCell>
                <TableCell>{this.props.bank_name}</TableCell>
                <TableCell>{this.props.bank_account}</TableCell>
                <TableCell>{this.props.kakao_account}</TableCell>
                <TableCell>{this.props.theater_name}</TableCell>
                <TableCell>{this.props.theater_location}</TableCell>
            </TableRow>
        )
    }
}
export default TroupManagementTable;