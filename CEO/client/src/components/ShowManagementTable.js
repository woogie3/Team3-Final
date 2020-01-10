import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withRouter } from "react-router-dom";
import ShowDelete from './ShowDelete';

class ShowManagementTable extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell><img src = {this.props.show_preview}/></TableCell>
                <TableCell>{this.props.show_title}</TableCell>
                <TableCell>{this.props.start_date}</TableCell>
                <TableCell>{this.props.end_date}</TableCell>
                <TableCell>{this.props.show_length}</TableCell>
                <TableCell>{this.props.genre_name}</TableCell>
                <TableCell>{this.props.genre_content}</TableCell>
                <TableCell>{this.props.show_content}</TableCell>
                <TableCell><ShowDelete stateRefresh={this.props.stateRefresh} show_title={this.props.show_title}/></TableCell>
            </TableRow>
        )
    }
}
export default withRouter(ShowManagementTable);