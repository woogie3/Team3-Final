import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class ShowVideo extends React.Component {
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

    callApi1 = async (match) => {
      let show_id = this.props.match.params.show_id;
      console.log(show_id);
        const response = await fetch('/api/showSelected/'+show_id);
        const body = await response.json();
        return body
     }

    componentDidMount() {
        this.callApi1()
          .then(res => this.setState({ show: res }))
          .catch(err => console.log(err));
      }

    render() {
        return (
            <div>
                  {this.state.show ? this.state.show.map(c => {
            return(
                <TableRow>
                    <TableCell>
                        
                        <img src={this.state.show[0].show_preview} alt="없음"/>
                    </TableCell>
                </TableRow>)
                  }) : "no data"}
            </div>
        )
    }
}
export default ShowVideo;