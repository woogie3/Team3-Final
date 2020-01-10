import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import '../css/ShowInfo.css';

class ShowInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          show: '',
        }
      }

    stateRefresh = () => {
        this.setState({
          show: ''
        });
        this.callApi1()
      .then(res => this.setState({ show: res }))
      .catch(err => console.log(err));

    }

    callApi1 = async () => {
        let show_id = this.props.match.params.show_id;
        const response = await fetch('/api/showSelected/'+show_id);
        const body = await response.json();
        return body
     }

    componentDidMount() {
        this.callApi1()
        .then(res => this.setState({ show: res }))
        .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                {this.state.show ? this.state.show.map(c => {
            return( 
                <TableRow>
                    <TableCell>
                        <Typography>
                            {c.show_title}<br/>
                            {c.show_content}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <img src={c.show_preview} alt="이미지없음"/>
                    </TableCell>
                </TableRow>)
            }) : "no data"}
            </div>
        )
    }
}
export default withRouter(ShowInfo);