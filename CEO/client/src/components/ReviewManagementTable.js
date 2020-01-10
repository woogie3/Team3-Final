import React,{Component} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ReviewManagementDeclaration from './ReviewManagementDeclaration'



class ReviewManagementTable extends Component{
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.show_title}</TableCell>
                <TableCell>{this.props.user_id}</TableCell>
                <TableCell>{this.props.review_content}</TableCell>
                <TableCell><ReviewManagementDeclaration stateRefresh={this.props.stateRefresh} review_content={this.props.review_content}/></TableCell>
                
            </TableRow>
        )
    }
}
export default ReviewManagementTable;