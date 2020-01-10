import React from 'react';
import TableCell from '@material-ui/core/TableCell';
class Show extends React.Component {
    render() {
        return (
            <TableCell>
                <li>{this.props.show_id}</li>
                <li>{this.props.troup_id}</li>
                <li>{this.props.genre_id}</li>
                <li>{this.props.show_title}</li>
                <li>{this.props.start_date}</li>
                <li>{this.props.end_date}</li>
                <li>{this.props.show_preview}</li>
                <li>{this.props.show_content}</li>
            </TableCell>
        )
    }
}
export default Show;